import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Seeded SQLite database used by the Vercel demo deployment (see src/lib/db.ts).
  outputFileTracingIncludes: {
    "/*": ["./prisma/demo.db"],
    "/**": ["./prisma/demo.db"],
  },
};

export default nextConfig;
