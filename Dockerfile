# -------------------------------
# Stage 1: Build
# -------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency files dan install
COPY package*.json ./
RUN npm ci

# Copy source code dan build
COPY . .
RUN npm run build

# -------------------------------
# Stage 2: Run (Production)
# -------------------------------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=1000

# Copy hasil build standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 1000
CMD ["node", "server.js"]