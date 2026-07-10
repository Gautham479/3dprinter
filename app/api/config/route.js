import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// Trigger HMR rebuild

export async function GET() {
  try {
    let config = await prisma.siteConfig.findUnique({ where: { id: 'global' } });
    if (!config) {
      config = await prisma.siteConfig.create({ data: { id: 'global' } });
    }
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
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
