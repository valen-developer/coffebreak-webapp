FROM node:16.14.2-alpine as build

RUN mkdir app
WORKDIR /app

COPY . .



RUN npm install
RUN npm run build:ssr


CMD ["node", "dist/server/main.js"]

