# === Base Stage ===
FROM node:20.18.1-alpine3.21 AS base
WORKDIR /app

# Copy and install dependencies only
COPY package*.json ./
RUN npm install

# === Project Stage (upload full project once) ===
FROM base AS project
COPY . .

# === Test Stage ===
FROM project AS test
# Install dev dependencies if needed
# RUN npm install --only=dev
RUN npm run test

# === Build Stage ===
FROM project AS builder
RUN npm run build

# === Production Stage ===
FROM nginx:1.27.4-alpine3.21-slim AS production

# Set working directory in the container
WORKDIR /usr/share/nginx/html

# Add some coziness
RUN apk update && apk add --no-cache \
    curl \
    jq \
    nano \
    wget \
    && rm -rf /var/cache/apk/* /tmp/*

# Serve built frontend via NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy configuration and starter files
COPY nginx/default.conf.template /etc/nginx/conf.d/
COPY nginx/nginx.conf.template /etc/nginx/
COPY nginx/start.sh /start.sh
RUN chmod +x /start.sh && rm -f /etc/nginx/conf.d/default.conf

# Expose the Nginx port
EXPOSE 80/tcp

# Start Nginx server via new starter
CMD ["/start.sh"]

