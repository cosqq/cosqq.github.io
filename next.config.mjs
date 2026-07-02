/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages (cosqq.github.io — served from the domain
  // root, so no basePath needed).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
