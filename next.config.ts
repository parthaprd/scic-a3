import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
  // Expose backend URL to the browser bundle.
  // NEXT_PUBLIC_API_URL must be set in Vercel Environment Variables.
  // Fallback points to the deployed backend so production never hits localhost.
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ||
      "https://scic-a3-backend.vercel.app/api",
  },
};

export default nextConfig;
