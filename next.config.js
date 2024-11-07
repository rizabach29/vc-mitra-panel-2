/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
      {
        // Sets security headers for all routes
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
            //You can use SAMEORIGIN as a value also.
          },
        ],
      },
      {
        // Sets security headers for all routes
        source: "/(.*)",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-h2h.s3.ap-southeast-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.vcgamers.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn-panel.vcg.my.id",
        port: "",
      },
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
