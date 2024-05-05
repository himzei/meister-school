/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
        port: "",
      },
      {
        hostname: "imagedelivery.net",
        port: "",
      },
    ],
  },
};

export default nextConfig;
