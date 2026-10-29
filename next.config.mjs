/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a verification build run alongside `next dev` without sharing .next
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // As on the design canvas, "Work" opens the case study page and "Services" opens
  // the service page (navbar and breadcrumbs). Temporary redirects, so overview
  // pages can take these URLs later if they are designed.
  async redirects() {
    return [
      { source: "/work", destination: "/work/votely", permanent: false },
      { source: "/services", destination: "/services/business-automation", permanent: false },
    ];
  },
};

export default nextConfig;
