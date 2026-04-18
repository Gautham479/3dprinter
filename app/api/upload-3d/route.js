import { getSupabaseAdminClient } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';

function sanitizeFileName(fileName) {
  return fileName.toLowerCase().replace(/[^a-z0-9.\-_]/g, '-');
}

export async function POST(req) {
  try {
    const { fileName, contentType } = await req.json();

    if (!fileName) {
      return NextResponse.json({ error: 'fileName is required' }, { status: 400 });
    }

    const safeName = sanitizeFileName(fileName);
    const storagePath = `3d-models/${Date.now()}-${safeName}`;
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'product-images';

    const supabase = getSupabaseAdminClient();

    // Generate a signed upload URL valid for 60 seconds
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUploadUrl(storagePath);

    if (error) {
      console.error("Supabase signed URL error:", error);
      return NextResponse.json({ error: `Could not generate upload URL: ${error.message}` }, { status: 500 });
    }

    // Get the final public URL that the file WILL have after client uploads it
    const publicUrlData = supabase.storage.from(bucket).getPublicUrl(storagePath);

    return NextResponse.json({ 
      signedUrl: data.signedUrl, 
      path: data.path,
      token: data.token,
      url: publicUrlData.data?.publicUrl || '' 
    });
  } catch (error) {
    console.error("Pre-sign 3D File Error:", error);
    return NextResponse.json({ error: 'Failed to initialize file upload payload' }, { status: 500 });
  }
}
