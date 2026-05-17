import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

import { authEnv } from "@memory-map/auth/env";
import { dbEnv } from "@memory-map/db/env";

export const env = createEnv({
  extends: [authEnv(), dbEnv()],
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  server: {
    PORT: z.coerce.number().default(3002),
    CORS_ORIGIN: z.string().optional(),
    API_URL: z.url().optional(),
    PRODUCTION_URL: z.url().optional(),
  },
  runtimeEnv: process.env,
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
