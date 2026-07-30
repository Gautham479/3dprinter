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
        source: '/products/idols',
        destination: '/category/Idols',
        permanent: true,
      },
      {
        source: '/products/action-figures',
        destination: '/category/Action%20Figures',
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
