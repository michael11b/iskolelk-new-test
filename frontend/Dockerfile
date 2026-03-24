# # # Frontend Dockerfile
# # FROM node:18-alpine AS builder

# # WORKDIR /app
# # COPY package*.json ./
# # RUN npm install

# # COPY . .
# # RUN npm run build

# # FROM node:18-alpine AS runner
# # WORKDIR /app

# # ENV NODE_ENV=production
# # ENV PORT=3000

# # COPY --from=builder /app/public ./public
# # COPY --from=builder /app/.next ./.next
# # COPY --from=builder /app/node_modules ./node_modules
# # COPY --from=builder /app/package.json ./package.json

# # EXPOSE 3000

# # CMD ["npm", "start"]

# # Frontend Dockerfile using Next.js
# FROM node:22-alpine AS builder

# WORKDIR /app

# COPY package*.json ./
# RUN npm ci

# COPY . .
# RUN npm run build

# # Production image
# FROM node:22-alpine

# WORKDIR /app
# COPY --from=builder /app ./

# EXPOSE 3000
# CMD ["npm", "start"]









# FROM node:22-alpine AS builder

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm ci

# COPY . .
# RUN npm run build

# FROM node:22-alpine

# WORKDIR /usr/src/app

# ENV NODE_ENV=production # TODO: change to the actual volume claim name
# ENV PORT=3000

# # COPY --from=builder /app/public ./public
# # COPY --from=builder /app/.next ./.next
# # COPY --from=builder /app/node_modules ./node_modules
# # COPY --from=builder /app/package.json ./package.json

# COPY --from=builder /usr/src/app/public ./public
# COPY --from=builder /usr/src/app/.next ./.next
# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/package.json ./package.json

# EXPOSE 3000

# CMD ["npm", "start"]











































FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

# Accept build arguments and turn them into env vars
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_API_BASE_URL_FILES
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_FILES_PUBLIC_DOMAIN
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL_FILES=$NEXT_PUBLIC_API_BASE_URL_FILES
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_FILES_PUBLIC_DOMAIN=$NEXT_PUBLIC_FILES_PUBLIC_DOMAIN

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=3000

# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
