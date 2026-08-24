# syntax=docker/dockerfile:1
# ========================================
# Dronwind — Astro SSR (Node.js standalone)
# ========================================
# Astro output: 'server' + @astrojs/node adapter in standalone mode.
# Do NOT use nginx here; the Node runtime serves all requests.

# ----------------------------------------
# Stage 1 — Build
# ----------------------------------------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ----------------------------------------
# Stage 2 — Production runtime (Node.js)
# ----------------------------------------
FROM node:18-alpine

WORKDIR /app

# Copy compiled Astro output
COPY --from=builder /app/dist/ ./dist/

# Copy package manifests so we can install production deps
COPY --from=builder /app/package*.json ./

# Install only production dependencies (needed by Astro SSR)
RUN npm ci --omit=dev && npm cache clean --force

# Astro standalone adapter listens on 4321 by default
EXPOSE 4321

# Start the SSR server
CMD ["node", "./dist/server/entry.mjs"]
