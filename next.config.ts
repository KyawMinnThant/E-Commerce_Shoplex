import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
  default-src *;
  script-src * 'unsafe-inline' 'unsafe-eval' *;
  style-src * 'unsafe-inline' *;
  img-src * data:;
  connect-src *;
  font-src *;
  frame-src *;
  base-uri *;
  form-action *;
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
