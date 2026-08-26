/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/home-decor',
        destination: '/category/Home%20Decor',
        permanent: true,
      },
      {
        source: '/collectibles',
        destination: '/category/Collectibles',
        permanent: true,
      },
      {
        source: '/products/idols',
        destination: '/category/Idols%20%26%20Action%20Figures',
        permanent: true,
      },
      {
        source: '/products/action-figures',
        destination: '/category/Idols%20%26%20Action%20Figures',
        permanent: true,
      },
      {
        source: '/products/kit-cards',
        destination: '/category/Playables',
        permanent: true,
      },
      {
        source: '/category/kit-cards',
        destination: '/category/Playables',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
