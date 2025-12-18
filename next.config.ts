import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' https://trusted.cdn.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               img-src * data:;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self' https://api.example.com;
              frame-src 'none';
              base-uri 'self';
              form-action 'self';
            `
              .replace(/\n/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
