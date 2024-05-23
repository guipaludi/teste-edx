/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.kabum.com.br',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
