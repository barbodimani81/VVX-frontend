# Dockerfile for Next.js Static Export
# --- Base versions ---
ARG NODE_IMAGE=node:20-alpine

# --- 1) builder: install deps and build the static export ---
FROM ${NODE_IMAGE} AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
# Copy rest of the project
COPY . .
# Build Next.js static export
RUN npm run build

# --- 2) runner: serve static files with nginx ---
FROM nginx:alpine AS runner
WORKDIR /app

# Copy static files from Next.js export
COPY --from=builder /app/out /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
    