FROM node:10.15.3-alpine

WORKDIR /app

COPY package*.json ./
RUN yarn install
COPY . .
