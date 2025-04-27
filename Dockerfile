# BUILDER
FROM node:22-alpine AS builder
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm ci

# build app
COPY . .
RUN npx nx run acc:build:production

# cleanup build dependencies
RUN npm ci --omit=dev


# SERVER
FROM node:22-alpine
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# copy from builder
COPY --from=builder /app/dist/apps/ ./dist/apps/

# run the server
EXPOSE 4000
CMD ["node", "dist/apps/acc/server/server.mjs"]