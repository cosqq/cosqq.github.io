/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages (served from the gh-pages branch root).
  output: "export",
  images: { unoptimized: true },
  // Emit each route as a folder with index.html so deep links resolve on a
  // static host with or without a trailing slash.
  trailingSlash: true,
};

export default nextConfig;
