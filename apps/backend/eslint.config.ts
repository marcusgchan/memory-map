import { defineConfig } from "eslint/config";

import { baseConfig } from "@memory-map/eslint-config/base";

export default defineConfig(
  {
    ignores: ["dist/**"],
  },
  baseConfig,
);
