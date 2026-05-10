import { defineConfig } from "eslint/config";

import { baseConfig, restrictEnvAccess } from "@memory-map/eslint-config/base";

export default defineConfig(
  {
    ignores: ["script/**"],
  },
  baseConfig,
  restrictEnvAccess,
);
