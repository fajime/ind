# etapa de compilación
FROM node:12.18.1 as build-stage
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

# etapa de producción
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]