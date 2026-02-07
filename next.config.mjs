/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export for GitHub Pages
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '', // Support for repository name in URL
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Required for static export
  },
}

export default nextConfig
