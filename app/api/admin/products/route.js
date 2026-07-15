import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/adminAuth';
import { MATERIAL_TYPES, PRODUCT_TYPES } from '@/lib/catalog';
import { saveProductImage, saveProductImages } from '@/lib/uploadImage';

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function requireAdmin() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    const details = error instanceof Error ? error.message : 'Unknown database error';
    return NextResponse.json(
      { error: `Database not available on this deployment. ${details}` },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const body = {
    name: String(formData.get('name') || '').trim(),
    fullDescription: String(formData.get('fullDescription') || '').trim(),
    note: String(formData.get('note') || '').trim(),
    material: String(formData.get('material') || '').trim(),
    price: String(formData.get('price') || '').trim(),
    type: String(formData.get('type') || '').trim(),
    tags: formData.getAll('tags').map(t => String(t).trim()).filter(Boolean),
    imageColor: String(formData.get('imageColor') || '').trim(),
    dimensions: String(formData.get('dimensions') || '').trim(),
    weight: String(formData.get('weight') || '').trim(),
    inStock: String(formData.get('inStock') || 'true') === 'true',
    isFeatured: String(formData.get('isFeatured') || 'false') === 'true',
  };

  // If tags provided, sync type to the first tag for backwards compat
  if (body.tags.length > 0) {
    body.type = body.tags[0];
  }

  const imageFile = formData.get('imageFile');
  const imageFiles = formData.getAll('imageFiles');

  const requiredFields = ['name', 'material', 'price'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json({ error: `${field} is required` }, { status: 400 });
    }
  }

  if (body.tags.length === 0) {
    return NextResponse.json({ error: 'At least one category tag is required' }, { status: 400 });
  }

  const price = Number(body.price);
  if (Number.isNaN(price) || price < 0) {
    return NextResponse.json({ error: 'Invalid price' }, { status: 400 });
  }

  const baseSlug = slugify(body.name);
  let slug = baseSlug || `product-${Date.now()}`;
  let suffix = 1;
  while (await prisma.product.findUnique({ where: { slug } })) {
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  let uploadedImagePath = '';
  let uploadedImagePaths = [];
  try {
    uploadedImagePath = await saveProductImage(imageFile);
    uploadedImagePaths = await saveProductImages(imageFiles);
  } catch (error) {
    console.error("Image upload error in POST /api/admin/products:", error);
    const details = error instanceof Error ? error.message : 'Unknown upload error';
    return NextResponse.json(
      { error: `Image upload failed. ${details}` },
      { status: 500 }
    );
  }

  try {
    const finalPrimaryImage = uploadedImagePath || uploadedImagePaths[0] || '';
    const finalImages = finalPrimaryImage
      ? [finalPrimaryImage, ...uploadedImagePaths.filter((url) => url !== finalPrimaryImage)]
      : uploadedImagePaths;

    const created = await prisma.product.create({
      data: {
        slug,
        name: body.name.trim(),
        fullDescription: body.fullDescription.trim(),
        note: body.note || null,
        material: body.material,
        price,
        image: finalPrimaryImage,
        images: finalImages,
        imageColor: body.imageColor || 'bg-primary-50',
        type: body.type,
        tags: body.tags,
        dimensions: body.dimensions || 'N/A',
        weight: body.weight || 'N/A',
        inStock: body.inStock !== false,
        isFeatured: body.isFeatured,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Database write error in POST /api/admin/products:", error);
    const details = error instanceof Error ? error.message : 'Unknown write error';
    return NextResponse.json(
      { error: `Database write failed. ${details}` },
      { status: 500 }
    );
  }
}

