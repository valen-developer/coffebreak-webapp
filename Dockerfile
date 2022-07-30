FROM node:16.14.2-alpine as build

RUN mkdir app
WORKDIR /app

COPY . .



RUN npm install
RUN npm run build:prod


FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html
