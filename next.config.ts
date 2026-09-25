import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
};

export default nextConfig;
