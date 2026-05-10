import { defineConfig } from "eslint/config";

import { baseConfig } from "@memory-map/eslint-config/base";
import { reactConfig } from "@memory-map/eslint-config/react";

export default defineConfig(
  {
    ignores: ["dist/**"],
  },
  baseConfig,
  reactConfig,
);
