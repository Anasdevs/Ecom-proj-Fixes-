/** @type {import('next').NextConfig} */
const { parsed } = require('dotenv').config();
const nextConfig = {
  images: {
    // domains: ['https://kreomart.onrender.com/api/products/'],
    
    
      domains: ['lh3.googleusercontent.com'],
    

    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "kreomart.onrender.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "kreomart.s3.ap-south-1.amazonaws.com",
        pathname: "/**",

      }
    
    ],
  },
  env: {
    NEXT_PUBLIC_API_ROOT: parsed.NEXT_PUBLIC_API_ROOT,
    GITHUB_CLIENT_ID: parsed.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: parsed.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: parsed.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: parsed.GOOGLE_CLIENT_SECRET,
    JWT_SECRET: parsed.JWT_SECRET,
    NEXTAUTH_SECRET: parsed.NEXTAUTH_SECRET,
  },
};

module.exports = nextConfig;
