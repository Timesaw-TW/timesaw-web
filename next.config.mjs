/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: () => {
    return [
      {
        source: "/api/internal/:slug",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URI}/:slug`,
      },
      {
        source: "/api/graphql",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URI}/graphql`,
      },
    ];
  },
};

export default nextConfig;
