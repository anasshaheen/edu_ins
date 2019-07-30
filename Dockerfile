FROM node:8.12.0-alpine

WORKDIR /app

COPY ./package.json ./

RUN apk add g++ make python

RUN yarn install

RUN npm install -g tsc \
  && npm install -g concurrently \
  && npm install -g typescript

COPY ./ ./

ENTRYPOINT [ "yarn", "start:dev" ]