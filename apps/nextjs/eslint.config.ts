import { defineConfig } from "eslint/config";

import { baseConfig, restrictEnvAccess } from "@memory-map/eslint-config/base";
import { nextjsConfig } from "@memory-map/eslint-config/nextjs";
import { reactConfig } from "@memory-map/eslint-config/react";

export default defineConfig(
  {
    ignores: [".next/**"],
  },
  baseConfig,
  reactConfig,
  nextjsConfig,
  restrictEnvAccess,
);
