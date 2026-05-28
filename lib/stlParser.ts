// lib/stlParser.ts

export interface STLMetrics {
  volumeCm3: number;
  boundingBox: { x: number; y: number; z: number };
  triangleCount: number;
}

/**
 * Parse binary STL and calculate ACTUAL volume using divergence theorem
 * This is the TRUE weight, not just bounding box guesses
 */
function parseSTLBinary(buffer: ArrayBuffer): STLMetrics {
  const view = new DataView(buffer);

  // Read triangle count from bytes 80-84
  const triCount = view.getUint32(80, true);

  let volume = 0; // mm³ (signed)
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;

  // Each triangle: 50 bytes total
  // Bytes 0-11: normal (skip)
  // Bytes 12-23: vertex 1 (3 floats)
  // Bytes 24-35: vertex 2 (3 floats)
  // Bytes 36-47: vertex 3 (3 floats)
  // Bytes 48-49: attribute (skip)

  for (let i = 0; i < triCount; i++) {
    const offset = 84 + i * 50;

    const v1x = view.getFloat32(offset + 12, true);
    const v1y = view.getFloat32(offset + 16, true);
    const v1z = view.getFloat32(offset + 20, true);

    const v2x = view.getFloat32(offset + 24, true);
    const v2y = view.getFloat32(offset + 28, true);
    const v2z = view.getFloat32(offset + 32, true);

    const v3x = view.getFloat32(offset + 36, true);
    const v3y = view.getFloat32(offset + 40, true);
    const v3z = view.getFloat32(offset + 44, true);

    // Signed volume contribution (divergence theorem)
    volume +=
      v1x * (v2y * v3z - v3y * v2z) -
      v1y * (v2x * v3z - v3x * v2z) +
      v1z * (v2x * v3y - v3x * v2y);

    // Track bounding box
    for (const [x, y, z] of [[v1x, v1y, v1z], [v2x, v2y, v2z], [v3x, v3y, v3z]]) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      if (z < minZ) minZ = z;
      if (z > maxZ) maxZ = z;
    }
  }

  // Convert mm³ to cm³
  const volumeCm3 = Math.abs(volume / 6) / 1000;

  return {
    volumeCm3,
    triangleCount: triCount,
    boundingBox: {
      x: (maxX - minX) / 10, // mm to cm
      y: (maxY - minY) / 10,
      z: (maxZ - minZ) / 10,
    },
  };
}

/**
 * ASCII STL fallback
 */
function parseSTLAscii(text: string): STLMetrics {
  const vertices: number[][] = [];
  const regex = /vertex\s+([\d.eE+-]+)\s+([\d.eE+-]+)\s+([\d.eE+-]+)/g;

  let match;
  while ((match = regex.exec(text)) !== null) {
    vertices.push([parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3])]);
  }

  let volume = 0;
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;

  for (let i = 0; i < vertices.length; i += 3) {
    const v1 = vertices[i], v2 = vertices[i + 1], v3 = vertices[i + 2];
    if (!v1 || !v2 || !v3) continue;

    volume +=
      v1[0] * (v2[1] * v3[2] - v3[1] * v2[2]) -
      v1[1] * (v2[0] * v3[2] - v3[0] * v2[2]) +
      v1[2] * (v2[0] * v3[1] - v3[0] * v2[1]);

    for (const v of [v1, v2, v3]) {
      if (v[0] < minX) minX = v[0]; if (v[0] > maxX) maxX = v[0];
      if (v[1] < minY) minY = v[1]; if (v[1] > maxY) maxY = v[1];
      if (v[2] < minZ) minZ = v[2]; if (v[2] > maxZ) maxZ = v[2];
    }
  }

  return {
    volumeCm3: Math.abs(volume / 6) / 1000,
    triangleCount: Math.floor(vertices.length / 3),
    boundingBox: {
      x: (maxX - minX) / 10,
      y: (maxY - minY) / 10,
      z: (maxZ - minZ) / 10,
    },
  };
}

/**
 * Auto-detect binary vs ASCII and parse
 */
export async function parseSTL(file: File): Promise<STLMetrics> {
  const buffer = await file.arrayBuffer();
  const header = new Uint8Array(buffer, 0, 5);
  const isAscii = String.fromCharCode(...header) === 'solid';

  if (isAscii) {
    const text = await file.text();
    return parseSTLAscii(text);
  }
  return parseSTLBinary(buffer);
}
