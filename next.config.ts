import type { NextConfig } from "next";
import { platformDemoEnabled, platformDemoUrl } from "./src/config/platform-demo";

const isProduction = process.env.NODE_ENV === "production";
const microsoftCustomerConnectScript = "https://res.public.onecdn.static.microsoft";
const microsoftCustomerConnectFrame = "https://customerconnect.teams.usercontent.microsoft";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${microsoftCustomerConnectScript}${isProduction ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${isProduction ? "" : " ws://localhost:* ws://127.0.0.1:* http://localhost:* http://127.0.0.1:*"}`,
  `frame-src 'self' ${microsoftCustomerConnectFrame}${platformDemoEnabled ? ` ${new URL(platformDemoUrl).origin}` : ""}`,
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  isProduction ? "upgrade-insecure-requests" : "",
].filter(Boolean).join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=()",
  },
];

const nextConfig: NextConfig = {
  // Keep development from adding generated instruction files to the source tree.
  agentRules: false,
  async redirects() {
    // Match only public website aliases; application and internal hosts keep their own routing.
    return ["jobbridge.app", "www.jobbridge.app", "www.workfa.re"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host.replaceAll(".", "\\.") }],
      destination: "https://workfa.re/:path*",
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
