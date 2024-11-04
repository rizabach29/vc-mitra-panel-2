/** @type {import('next').NextConfig} */
const nextConfig = {
    //output: "standalone",
    eslint: {
        ignoreDuringBuilds: true,
    },
    async headers() {
        return [
          {
            source: '/:path*',
            headers: [
              {
                key: 'X-Robots-Tag',
                value: 'index, follow',
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
