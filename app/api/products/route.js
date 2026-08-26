import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const FALLBACK_PRODUCTS = [
  {
    id: 'prod-1',
    slug: 'desk-organizer-pro',
    name: 'Desk Organizer Pro',
    fullDescription: 'Sleek modular desk organizer for office essentials.',
    material: 'PLA',
    price: 499,
    image: '/pics/desk_organizers.png',
    images: ['/pics/desk_organizers.png'],
    imageColor: '#111111',
    type: 'Organizers',
    tags: ['Organizers'],
    dimensions: '150mm x 100mm x 80mm',
    weight: '220g',
    inStock: true,
    isFeatured: true,
  },
  {
    id: 'prod-2',
    slug: 'anime-action-figure',
    name: 'Mecha Knight Figure',
    fullDescription: 'High-detail 3D printed mecha collectible figure.',
    material: 'PETG',
    price: 1299,
    image: '/photos/action 1.jpeg',
    images: ['/photos/action 1.jpeg'],
    imageColor: '#3B82F6',
    type: 'Action Figures',
    tags: ['Action Figures', 'Collectibles'],
    dimensions: '200mm x 120mm x 100mm',
    weight: '350g',
    inStock: true,
    isFeatured: true,
  },
  {
    id: 'prod-3',
    slug: 'kit-card-plane',
    name: 'Biplane Kit Card',
    fullDescription: 'Snap-fit 3D printed assembly kit card.',
    material: 'PLA',
    price: 299,
    image: '/pics/kit_cards.png',
    images: ['/pics/kit_cards.png'],
    imageColor: '#A855F7',
    type: 'Kit Cards',
    tags: ['Kit Cards'],
    dimensions: '120mm x 120mm x 2mm',
    weight: '45g',
    inStock: true,
    isFeatured: true,
  },
  {
    id: 'prod-4',
    slug: 'home-decor-vase',
    name: 'Geometric Spiral Vase',
    fullDescription: 'Modern aesthetic spiral vase for dried flowers.',
    material: 'PLA',
    price: 799,
    image: '/pics/home decor.webp',
    images: ['/pics/home decor.webp'],
    imageColor: '#10B981',
    type: 'Home Decor',
    tags: ['Home Decor'],
    dimensions: '180mm x 90mm x 90mm',
    weight: '180g',
    inStock: true,
    isFeatured: true,
  }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeOutOfStock = searchParams.get('includeOutOfStock') === '1';
    const featuredOnly = searchParams.get('featured') === '1';
    const categoryFilter = searchParams.get('category');

    let whereClause = {};
    if (!includeOutOfStock) whereClause.inStock = true;
    if (featuredOnly) whereClause.isFeatured = true;

    if (categoryFilter) {
      if (categoryFilter.toLowerCase().includes('idol') || categoryFilter.toLowerCase().includes('action')) {
        whereClause.OR = [
          { tags: { hasSome: ['Idols & Action Figures', 'Action Figures', 'Idols', 'Action Figure', 'Idol'] } },
          { type: { in: ['Idols & Action Figures', 'Action Figures', 'Idols', 'Action Figure', 'Idol'], mode: 'insensitive' } },
        ];
      } else {
        whereClause.OR = [
          { tags: { has: categoryFilter } },
          { AND: [{ tags: { isEmpty: true } }, { type: { equals: categoryFilter, mode: 'insensitive' } }] },
        ];
      }
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.warn('Database error in /api/products, serving fallback products:', error?.message);
    return NextResponse.json(FALLBACK_PRODUCTS);
  }
}
