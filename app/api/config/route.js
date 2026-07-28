import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// Trigger HMR rebuild

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        id: 'global',
        heroHeading: 'Industrial Grade 3D Printing, Simplified.',
        heroSubheading: 'Upload your 3D model. Choose material. We craft and deliver precision parts with engineering-grade accuracy — every single time.',
        printerBedSize: '256mm x 256mm x 256mm',
        contactNotice: 'Note: You can update order notes within 1 hour of placing your order using your Order Number.'
      });
    }
    let config = await prisma.siteConfig.findUnique({ where: { id: 'global' } });
    if (!config) {
      config = await prisma.siteConfig.create({ data: { id: 'global' } });
    }
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({
      id: 'global',
      heroHeading: 'Industrial Grade 3D Printing, Simplified.',
      heroSubheading: 'Upload your 3D model. Choose material. We craft and deliver precision parts with engineering-grade accuracy — every single time.',
      printerBedSize: '256mm x 256mm x 256mm',
      contactNotice: 'Note: You can update order notes within 1 hour of placing your order using your Order Number.'
    });
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
