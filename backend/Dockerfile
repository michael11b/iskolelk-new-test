# # # Backend Dockerfile
# # FROM node:18-alpine

# # WORKDIR /app

# # COPY package*.json ./# TODO: change to the actual volume claim name
# # RUN npm install

# # COPY . .

# # RUN npm run build

# # ENV NODE_ENV=production
# # EXPOSE 3002

# # CMD ["npm", "run", "start:build"]









# # Backend Dockerfile for Node.js v22
# FROM node:22-alpine

# # Create app directory
# WORKDIR /usr/src/app

# # Install dependencies
# COPY package*.json ./
# RUN npm ci --omit=dev

# # Bundle app source
# COPY . .

# # Expose backend port
# EXPOSE 5000

# # Start the backend
# CMD ["node", "server.js"]



# FROM node:22-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm ci --omit=dev

# COPY . .

# RUN npm run build

# ENV NODE_ENV=production
# EXPOSE 3002

# CMD ["node", "dist/index.js"]







FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN npm run build

ENV NODE_ENV=production
EXPOSE 3002

CMD ["node", "dist/index.js"]
