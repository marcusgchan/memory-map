FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.19.0 --activate
WORKDIR /app

FROM base as prepare
RUN pnpm i -g turbo@2.5.8
COPY . .
RUN turbo prune @memory-map/backend --docker

FROM base as builder
COPY --from=prepare /app/out/json .
RUN pnpm i --frozen-lockfile
COPY --from=prepare /app/out/full .

RUN pnpm run build

FROM base as runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 backend
USER backend

COPY --from=builder --chown=backend:nodejs /app .

WORKDIR /app/apps/backend
EXPOSE 3002
CMD ["pnpm", "run", "start"]
