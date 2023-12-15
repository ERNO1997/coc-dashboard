FROM node:18-alpine

WORKDIR /usr/app

COPY package.json package-lock.json ./
COPY . .
RUN npm run build
