/// <reference types="vitest" />

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { defineConfig } from "vite";
import { execSync } from "child_process";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vitejs.dev/config/
export default defineConfig(() => {
  process.env.VITE_GIT_COMMIT_DATE = execSync("git log -1 --format=%cI").toString().trimEnd();
  process.env.VITE_GIT_COMMIT_HASH = execSync("git describe --always --dirty").toString().trimEnd();

  return {
    plugins: [TanStackRouterVite(), react(), babel({ presets: [reactCompilerPreset()] })],
    base: "/calendar",
    build: {
      sourcemap: true,
    },
    resolve: {
      tsconfigPaths: true,
    },
    test: {
      environment: "jsdom",
      coverage: {
        exclude: [".pnp.cjs"],
      },
    },
  };
});
