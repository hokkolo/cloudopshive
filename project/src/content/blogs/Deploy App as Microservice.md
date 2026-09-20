Learn how to deploy a web-app over the microservice architecture using docker. This architecture can be used to deploy multiple webapps as we are using Nginx reverse proxy.
![DevOps Workflow](/blogs/webapp-micro.png)
Let's assume docker and docker-compose are already installed on your device. If not installed,

[Click here](https://docs.docker.com/compose/install/) for docker installation procedures

## Microservice Architecture
What we see in software development now is the monolithic approach of implementation, which can turn problematic as the application gets larger and more complex. This scenario created a need for a new development strategy, resulting in the microservice architecture.

## Looking ahead
Consider a simple WordPress website, let’s see how it is installed and configured in the monolithic approach:-

1. Install any web server in the VM
2. Install any database in the VM
3. Download the WordPress core file, copy it to the document root, and continue the installation of the WordPress engine.

When it comes to the microservice architecture, it is entirely a different approach as to the monolithic installation. Let's see how it is different.

1. Incoming traffic is managed by an instance
2. Each website resides on a different instance (based on the incoming requests, the websites are routed to corresponding instances)
3. The database is managed by another instance.

In this scenario, I have used *docker-compose* to implement the setup.
```
version: '3.1'
services:
  loadbalancer:
   image: nginx:latest
   container_name: nginx_lb
   volumes:
   - ./nginx/code:/code
   - ./nginx/core.conf:/etc/nginx/conf.d/core.conf
   - ./nginx/proxy.conf:/etc/nginx/conf.d/proxy.conf
   - ./nginx/wordpress.conf:/etc/nginx/conf.d/wordpress.conf
   ports:
     - "80:80"
   links:
   - web1
   - db
  web1:
   container_name: wordpress_cont
   build: wordpress/
   volumes:
   - ./wordpress/docroot:/var/www/html
   links:
   - db
   environment:
     WORDPRESS_DB_HOST: db:3306
     WORDPRESS_DB_USER: db_username
     WORDPRESS_DB_PASSWORD: db_user_password
     WORDPRESS_DB_NAME: db_name
  db:
   image: mysql:latest
   container_name: database
   volumes:
   - ./database/data:/var/lib/mysql
   - ./database/conf.d:/etc/mysql/conf.d
   environment:
     MYSQL_ROOT_PASSWORD: mysql_root_password
     MYSQL_DATABASE: db_name
     MYSQL_USER: db_username
     MYSQL_PASSWORD: db_user_password
```
I have implemented three services here:-

- loadbalancer — to manage the incoming traffic (here Nginx is used)
- web1 — contains the website files (here WordPress is used)
- db — database service (here MySQL is used)

In the root directory of the *docker-compose.yml* file, corresponding directories are created for each service to enhance the easiness of workflow.

**./nginx/code** is mounted to **/code** of the nginx container. This is basically the document root directory for nginx web server and contains only a index.html file.

**./nginx/core.conf** is the default nginx conf

```
# ./nginx/core.conf
server {
    listen       80;
    server_name  localhost;
#charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;
location / {
        root   /code;
        index  index.html index.htm;
    }
# redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```
**./nginx/proxy.conf** is the reverse proxy configuration for nginx.

```
# ./nginx/proxy.conf
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_buffering off;
proxy_request_buffering off;
proxy_http_version 1.1;
proxy_intercept_errors on;
```

**./nginx/wordpress.conf** is the nginx website configuration to redirect to website container. Currently configured for site “mytestsite.com”.

```
# ./nginx/wordpress.conf

server {
           listen 80;
           server_name mytestsite.com www.mytestsite.com;
           location / {
              proxy_pass http://web1;
           }
}
```
**./wordpress/docroot** is the website document root directory.
```
# ./wordpress/Dockerfile
FROM wordpress
run service apache2 restart
```
**./database/data** is mounted to **/var/lib/mysql** for persistent mysql data.

**./database/conf.d** is mounted to mysql configuration.

Thus the *docker-compose.yml* is ready. If you are in the same directory of the docker compose file, run :-
```
# docker-compose build
# docker-compose up -d
```
If everything goes well, you’ll get the following output:-
![Sample](/blogs/output.png)


### *Thank you for reading, feel free to contact us for more details*
