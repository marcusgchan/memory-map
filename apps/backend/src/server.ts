import { serve } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { appRouter, createTRPCContext } from "@memory-map/api";
import { initAuth } from "@memory-map/auth";

import { env } from "./env";

// const auth = initAuth({
//   baseUrl: env.API_URL ?? `http://localhost:${env.PORT}`,
//   productionUrl: env.PRODUCTION_URL ?? `http://localhost:${env.PORT}`,
//   secret: env.AUTH_SECRET,
//   discordClientId: env.AUTH_DISCORD_ID,
//   discordClientSecret: env.AUTH_DISCORD_SECRET,
// });

const app = new Hono();
console.log("custom", env);

console.log("default", process.env);
app.use(
  "/api/*",
  cors({
    origin: env.CORS_ORIGIN?.split(",") ?? ["http://localhost:3001"],
    credentials: true,
  }),
);

app.get("/health", (c) => c.text("No content"));

// app.all("/api/auth/{*}", (c) => auth.handler(c.req.raw));

// app.all("/api/trpc/{*}", (c) =>
//   fetchRequestHandler({
//     endpoint: "/api/trpc",
//     router: appRouter,
//     req: c.req.raw,
//     createContext: () =>
//       createTRPCContext({ auth, headers: c.req.raw.headers }),
//     onError({ error, path }) {
//       console.error(`tRPC Error on '${path}'`, error);
//     },
//   }),
// );

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  console.log(`API server running on http://localhost:${info.port}`);
});
