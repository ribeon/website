import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Data modules are generated from GCS by prebuild/predev.
  turbopack: { root: path.resolve(__dirname, "..") },
  outputFileTracingRoot: path.resolve(__dirname, ".."),
  output: 'export',       // generate static HTML in out/
  trailingSlash: true,    // /datasets/gov-spending → .../index.html (required for GitHub Pages)
  images: {
    unoptimized: true,    // next/image optimization requires a server; not available in static export
  },
};

export default nextConfig;
