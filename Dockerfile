FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx nx run acc:build:production
RUN npm ci --omit=dev

FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist/apps/ ./dist/apps/
EXPOSE 4000
CMD ["node", "dist/apps/acc/server/server.mjs"]