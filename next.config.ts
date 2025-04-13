// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.pexels.com",
//         port: "",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// export default nextConfig;

const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/digital-library/' : '',
  basePath: isProd ? '/digital-library' : '',
  output: 'export'
};

export default nextConfig;