#stage 1
FROM node:latest as node
WORKDIR /app
COPY project/ .
RUN npm install
RUN npm run build
#stage 2
FROM debian:latest
RUN apt update && apt install -y nginx nginx-extras && rm -rf /var/lib/apt/lists/*
COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY conf/default.conf /etc/nginx/conf.d/
COPY --from=node /app/dist/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
