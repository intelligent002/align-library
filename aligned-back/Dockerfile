# --- Stage 1: Builder ---
FROM node:20.18.1-alpine3.21 AS builder

WORKDIR /app

# Install all dependencies including devDependencies
COPY package*.json ./
RUN npm ci

# Copy all source code
COPY . .

# --- Stage 2: Test ---
FROM builder AS tester

WORKDIR /app

# Copy built source and node_modules from builder
COPY --from=builder /app /app

# if you have additional test setup, install here
# RUN npm install --only=dev

# Run tests (replace with your actual test command)
CMD ["npm", "test"]

# --- Stage 3: Production ---
FROM builder AS production

WORKDIR /app

# Copy only required files from builder
COPY --from=builder /app /app

# Prune devDependencies
RUN npm prune --production

# Expose backend API port
EXPOSE 8001/tcp

# Start server
CMD ["node", "server.js"]
