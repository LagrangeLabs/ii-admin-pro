FROM nginx:1.11.6-alpine
MAINTAINER Haoke

EXPOSE 8080

ENV TZ=Asia/Shanghai
ENV LANG=C.UTF-8


COPY ./nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /app

WORKDIR /app

COPY ./dist /app

RUN mkdir -p /app/public
