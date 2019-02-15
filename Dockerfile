FROM node
RUN apt-get update && apt-get install -y

EXPOSE 8080
ENV APP_DIR /application

WORKDIR $APP_DIR
CMD yarn install && yarn upgrade && yarn serve
