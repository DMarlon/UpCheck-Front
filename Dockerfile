FROM node
RUN apt-get update && apt-get install -y

EXPOSE 8181
ENV APP_DIR /application

WORKDIR $APP_DIR
CMD yarn upgrade && yarn serve
