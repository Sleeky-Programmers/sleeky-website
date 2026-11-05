/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a verification build run alongside `next dev` without sharing .next
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // Images uploaded in the Sleeky CMS are served from Cloudinary.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" }],
  },

  // As on the design canvas, "Services" opens the service page (navbar and
  // breadcrumbs). A temporary redirect, so an overview page can take this URL later.
  // ("Work" opens the first case study: app/(site)/work/page.tsx.)
  async redirects() {
    return [
      { source: "/services", destination: "/services/business-automation", permanent: false },
    ];
  },
};

export default nextConfig;
