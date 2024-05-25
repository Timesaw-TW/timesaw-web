/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: () => {
    return [
      {
        source: "/api/internal/:slug",
        destination: `${process.env.BACKEND_URI}/:slug`,
      },
    ];
  },
};

export default nextConfig;
