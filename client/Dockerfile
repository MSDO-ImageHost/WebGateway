FROM node:12-alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html

ENV PORT=80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]