/** @type {import('next').NextConfig} */
const nextConfig = {
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
