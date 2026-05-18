import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// import { env } from "./env";
import * as schema from "./schema";

console.log("env", process.env);
const client = postgres(process.env.DATABASE_URL as unknown as string, {
  prepare: false,
});

export const db = drizzle({
  client,
  schema,
  casing: "snake_case",
});
