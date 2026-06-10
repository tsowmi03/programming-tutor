import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    include: ["src/**/*.test.ts"],
    // The live Piston integration test is opt-in: RUN_LIVE=1 npm run test:live
    exclude: process.env.RUN_LIVE
      ? ["node_modules/**"]
      : ["node_modules/**", "src/**/*.live.test.ts"],
    testTimeout: 120_000,
  },
});
