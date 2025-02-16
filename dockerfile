# Use Node.js 22.14.0
FROM node:22.14.0-slim AS builder

WORKDIR /app
# Define build arguments for each environment variable
ARG NEXT_PUBLIC_OPENWEATHER_API_KEY
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY 


# Set environment variables from build arguments
ENV NEXT_PUBLIC_OPENWEATHER_API_KEY=$NEXT_PUBLIC_OPENWEATHER_API_KEY
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

# Copy package files
COPY package.json ./
COPY package-lock.json ./
# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:22.14.0-slim

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public

# Set environment variables again in the production stage
ENV NEXT_PUBLIC_OPENWEATHER_API_KEY=$NEXT_PUBLIC_OPENWEATHER_API_KEY
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]