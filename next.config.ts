import type { NextConfig } from "next";

/**
 * Nazareth Hub - next.config.ts
 *
 * The source template (template/itsolution-master) shipped no build config of any
 * kind, so every setting below is additive. STEP 5 requires remotePatterns for
 * images.pexels.com; the zip's own assets stay self-hosted under /public.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.pexels.com",
        pathname: "/**",
      },
    ],
  },

  // The zip's static assets (css/, js/, fonts/, scss/, images/) are served from
  // /public so every original relative path keeps resolving unchanged.
};

export default nextConfig;
