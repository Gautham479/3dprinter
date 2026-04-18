import { getSupabaseAdminClient } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';

function sanitizeFileName(fileName) {
  return fileName.toLowerCase().replace(/[^a-z0-9.\-_]/g, '-');
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || typeof file.arrayBuffer !== 'function') {
      return NextResponse.json({ error: 'Invalid file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (!buffer.length) {
      return NextResponse.json({ error: 'File is empty' }, { status: 400 });
    }

    const safeName = sanitizeFileName(file.name || 'custom-model.stl');
    // Using the same bucket 'product-images' as it's an easy default without setting up new RLS policies, 
    // but placing 3D models in a "3d-models" folder
    const fileName = `3d-models/${Date.now()}-${safeName}`;
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'product-images';

    const supabase = getSupabaseAdminClient();
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, buffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase storage error:", uploadError);
      return NextResponse.json({ error: `Supabase upload failed: ${uploadError.message}` }, { status: 500 });
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    
    return NextResponse.json({ url: data?.publicUrl || '' });
  } catch (error) {
    console.error("Upload 3D File Error:", error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
