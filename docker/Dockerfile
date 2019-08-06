FROM node:8.12.0-alpine AS builder

WORKDIR /app

RUN apk add g++ make python

RUN npm install -g tsc \
  && npm install -g concurrently \
  && npm install -g typescript

COPY ./package.json ./

RUN yarn install

COPY ./ ./

RUN yarn build

FROM node:8.12.0-alpine

WORKDIR /app

COPY --from=builder ./app/build ./
COPY --from=builder ./app/package.json ./
COPY --from=builder ./app/node_modules ./

ENTRYPOINT [ "node", "main.js" ]