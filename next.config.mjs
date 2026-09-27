/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920, 2400],
  },
  // For a fully static export (e.g. to cPanel / S3), uncomment the two lines below.
  // output: "export",
  // images: { unoptimized: true },
};
export default nextConfig;
