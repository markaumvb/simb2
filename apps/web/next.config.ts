import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["database", "ui"],
};

export default nextConfig;
