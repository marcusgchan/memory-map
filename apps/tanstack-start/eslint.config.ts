import { defineConfig } from "eslint/config";

import { baseConfig, restrictEnvAccess } from "@memory-map/eslint-config/base";
import { reactConfig } from "@memory-map/eslint-config/react";

export default defineConfig(
  {
    ignores: [".nitro/**", ".output/**", ".tanstack/**"],
  },
  baseConfig,
  reactConfig,
  restrictEnvAccess,
);
