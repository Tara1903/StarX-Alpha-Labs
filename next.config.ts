import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https: wss: blob:",
      "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://flow.starx.io",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Retired public demo marketplace -> redirected to StarX Design Studio
      {
        source: "/demos",
        destination: "/design-studio",
        permanent: true,
      },
      {
        source: "/demos/:path*",
        destination: "/design-studio",
        permanent: true,
      },
      // Retired video station
      {
        source: "/video-station",
        destination: "/",
        permanent: false,
      },
      {
        source: "/video-station/:path*",
        destination: "/",
        permanent: false,
      },
      // Legacy service routes -> Canonical Divisions
      {
        source: "/website-development",
        destination: "/divisions/starx-web",
        permanent: true,
      },
      {
        source: "/app-development",
        destination: "/divisions/starx-apps",
        permanent: true,
      },
      {
        source: "/website-app-combo",
        destination: "/divisions/starx-custom",
        permanent: true,
      },
      {
        source: "/development-services",
        destination: "/divisions",
        permanent: true,
      },
      // Legacy division aliases
      {
        source: "/divisions/starx-digital",
        destination: "/divisions/starx-web",
        permanent: true,
      },
      {
        source: "/divisions/starx-systems",
        destination: "/divisions/starx-business",
        permanent: true,
      },
      {
        source: "/divisions/starx-ai-solutions",
        destination: "/divisions/starx-ai",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
