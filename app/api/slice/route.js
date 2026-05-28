import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import os from 'os';
import fs from 'fs/promises';

// Pricing configuration
const PRICING = {
  materialPricePerKg: 1300,
  electricityCostPerHour: 8,
  machinePrice: 100000,
  machineLifeYears: 2,
  workingDaysPerYear: 300,
  profitPercent: 97,
  setupFee: 0,
  minimumPrice: 50
};

function calculateQuote(filamentGrams, printTimeHours) {
  const totalLifeHours = PRICING.machineLifeYears * PRICING.workingDaysPerYear * 8;
  const deprPerHr = PRICING.machinePrice / totalLifeHours;

  const materialCost = (filamentGrams / 1000) * PRICING.materialPricePerKg;
  const electricityCost = printTimeHours * PRICING.electricityCostPerHour;
  const depreciationCost = printTimeHours * deprPerHr;

  const subtotal = materialCost + electricityCost + depreciationCost;
  const profitAmount = subtotal * (PRICING.profitPercent / 100);

  const basePrice = subtotal + profitAmount + PRICING.setupFee;
  return Math.max(PRICING.minimumPrice, Math.round(basePrice));
}

function runSlicer(slicerPath, args, timeoutMs = 60000) {
  return new Promise((resolve, reject) => {
    const process = spawn(slicerPath, args, { windowsVerbatimArguments: true });
    
    let stdout = '';
    let stderr = '';

    const timeout = setTimeout(() => {
      process.kill('SIGKILL');
      reject(new Error(`Slicer timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    process.stdout.on('data', (data) => { stdout += data.toString(); });
    process.stderr.on('data', (data) => { stderr += data.toString(); });

    process.on('close', (code) => {
      clearTimeout(timeout);
      if (code !== 0) {
        reject(new Error(`Slicer exited with code ${code}\nStderr: ${stderr}`));
      } else {
        resolve(stdout);
      }
    });
    
    process.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

export async function POST(req) {
  let modelPath = null;
  let gcodePath = null;
  let configPath = null;

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ status: 'error', error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Validate extension
    const ext = file.name ? path.extname(file.name).toLowerCase() : '.stl';
    const validExts = ['.stl', '.3mf', '.obj'];
    if (!validExts.includes(ext)) {
      return NextResponse.json({ status: 'error', error: 'Invalid file type. Only STL, 3MF, and OBJ are supported.' }, { status: 400 });
    }

    // Setup temporary files
    const tmpDir = os.tmpdir();
    const sessionId = Date.now() + '_' + Math.random().toString(36).substring(7);
    modelPath = path.join(tmpDir, `model_${sessionId}${ext}`);
    gcodePath = path.join(tmpDir, `model_${sessionId}.gcode`);
    
    await fs.writeFile(modelPath, buffer);

    // Determine slicer executable
    let slicerCmd = 'orca-slicer';
    const localPath = 'C:\\Users\\GAUTHAM\\Downloads\\OrcaSlicer_Windows_V2.3.2_portable\\orca-slicer.exe';
    
    if (process.platform === 'win32') {
      try {
        await fs.access(localPath);
        slicerCmd = localPath;
      } catch (e) {
        slicerCmd = 'orca-slicer-console.exe'; // Fallback to PATH
      }
    }

    // Prepare arguments for spawn
    // Using --export-gcode or standard PrusaSlicer flags for the newest version
    const args = [
      '--slice', '0',
      '--export-gcode',
      '--output', gcodePath
    ];

    // Check for config.json if not a .3mf
    if (ext !== '.3mf') {
      configPath = path.join(process.cwd(), 'config.json');
      try {
        await fs.access(configPath);
        args.push('--load-settings', configPath);
      } catch (e) {
        // No config found, proceed without it
      }
    }

    args.push(modelPath);

    console.log(`Executing slicer: "${slicerCmd}" ${args.join(' ')}`);
    
    // Run slicer with a 60-second timeout
    await runSlicer(slicerCmd, args, 60000);

    // Parse the generated GCODE
    const gcodeContent = await fs.readFile(gcodePath, 'utf-8');
    
    let filamentUsed = 0;
    let printTimeSeconds = 0;
    let supportUsed = 0; // In grams, if applicable
    
    // Parse filament used
    const weightMatch = gcodeContent.match(/filament used \[g\] = ([\d.]+)/);
    if (weightMatch) filamentUsed = parseFloat(weightMatch[1]);
    
    // Parse support used (often logged similarly in Prusa/Orca)
    const supportMatch = gcodeContent.match(/support material used \[g\] = ([\d.]+)/);
    if (supportMatch) supportUsed = parseFloat(supportMatch[1]);
    
    // Parse print time
    const timeMatch = gcodeContent.match(/estimated printing time.*= (.*)/);
    if (timeMatch) {
      const timeStr = timeMatch[1];
      let hours = 0, mins = 0, secs = 0;
      const hMatch = timeStr.match(/(\d+)h/);
      const mMatch = timeStr.match(/(\d+)m/);
      const sMatch = timeStr.match(/(\d+)s/);
      
      if (hMatch) hours = parseInt(hMatch[1]);
      if (mMatch) mins = parseInt(mMatch[1]);
      if (sMatch) secs = parseInt(sMatch[1]);
      
      printTimeSeconds = (hours * 3600) + (mins * 60) + secs;
    }

    const printTimeHours = printTimeSeconds / 3600;
    
    if (filamentUsed === 0 && printTimeSeconds === 0) {
      throw new Error("GCODE was generated but metadata could not be parsed.");
    }

    // Calculate quote
    const estimatedPrice = calculateQuote(filamentUsed, printTimeHours);

    // Cleanup
    await fs.unlink(modelPath).catch(()=>{});
    await fs.unlink(gcodePath).catch(()=>{});

    return NextResponse.json({
      status: 'success',
      estimatedPrice,
      printTime: printTimeHours,
      filamentUsed,
      supportUsed
    });
    
  } catch (err) {
    console.error("Slicing Automation Error:", err);
    
    // Cleanup on error
    if (modelPath) await fs.unlink(modelPath).catch(()=>{});
    if (gcodePath) await fs.unlink(gcodePath).catch(()=>{});

    return NextResponse.json({ 
      status: 'error',
      error: 'Failed to process slicing job',
      details: err.message
    }, { status: 500 });
  }
}
