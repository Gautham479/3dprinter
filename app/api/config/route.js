import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const DEFAULT_CONFIG = {
  id: 'global',
  heroHeading: 'Industrial Grade 3D Printing, Simplified.',
  heroSubheading: 'Get instant quotes and upload your 3D models. We deliver precision parts with absolute accuracy, ensuring fault-proof prints for engineering and design.',
  printerBedSize: '256mm x 256mm x 256mm',
  contactNotice: 'Note: You can update order notes within 1 hour of placing your order using your Order Number.',
  collageImages: ['/pics/collectibles.png', '/pics/desk_organizers.png', '/pics/home decor.webp', '/pics/playables.jpg'],
};

export async function GET() {
  try {
    let config = await prisma.siteConfig.findUnique({ where: { id: 'global' } });
    if (!config) {
      config = await prisma.siteConfig.create({ data: { id: 'global' } });
    }
    return NextResponse.json(config);
  } catch (error) {
    console.warn('Database error in /api/config, serving default config:', error?.message);
    return NextResponse.json(DEFAULT_CONFIG);
  }
}

export async function PATCH(request) {
  try {
    const data = await request.json();
    const config = await prisma.siteConfig.upsert({
      where: { id: 'global' },
      update: {
        heroHeading: data.heroHeading,
        heroSubheading: data.heroSubheading,
        printerBedSize: data.printerBedSize,
        contactNotice: data.contactNotice,
      },
      create: {
        id: 'global',
        heroHeading: data.heroHeading,
        heroSubheading: data.heroSubheading,
        printerBedSize: data.printerBedSize,
        contactNotice: data.contactNotice,
      }
    });
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
}
