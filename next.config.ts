import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',       // generate static HTML in out/
  trailingSlash: true,    // /datasets/gov-spending → .../index.html (required for GitHub Pages)
  images: {
    unoptimized: true,    // next/image optimization requires a server; not available in static export
  },
};

export default nextConfig;
