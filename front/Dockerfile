FROM node:18 AS build
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
RUN mkdir -p /usr/share/nginx/html/public


COPY check_apk_and_move.sh /check_apk_and_move.sh
RUN chmod +x /check_apk_and_move.sh

# Exécution du script avant le démarrage de NGINX
CMD ["/bin/sh", "-c", "/check_apk_and_move.sh && nginx -g 'daemon off;'"]
