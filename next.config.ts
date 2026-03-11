import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.fakhruddinproperties.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "projects.fakhruddinproperties.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "toppng.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
