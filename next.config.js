/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s4.anilist.co",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/anime",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
