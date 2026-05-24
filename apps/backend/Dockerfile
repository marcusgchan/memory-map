FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.19.0 --activate
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app

FROM base as prepare
RUN pnpm i -g turbo@2.5.8
COPY . .
RUN turbo prune @memory-map/backend --docker

FROM base AS builder
COPY --from=prepare /app/out/json .
RUN pnpm i --frozen-lockfile
COPY --from=prepare /app/out/full .

# FROM node:22-alpine AS runner
FROM base AS runner
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 backend
# USER backend
WORKDIR /app

# COPY --from=builder --chown=backend:nodejs /app/apps/backend apps/backend
# COPY --from=builder --chown=backend:nodejs /app/packages packages
# COPY --from=builder --chown=backend:nodejs /app/node_modules node_modules
# COPY --from=builder --chown=backend:nodejs /app/pnpm-workspace.yaml pnpm-workspace.yaml

COPY --from=builder /app/apps/backend apps/backend
COPY --from=builder /app/packages packages
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/pnpm-workspace.yaml pnpm-workspace.yaml
COPY --from=builder /app/tooling tooling

WORKDIR /app/apps/backend
EXPOSE 3000
CMD ["npx", "tsx", "src/server.ts"]
