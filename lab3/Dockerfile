FROM ubuntu:22.04

RUN apt update && apt install -y nodejs npm
RUN mkdir /app
COPY package.json /app/
WORKDIR /app

RUN npm config set legacy-peer-deps true && npm install

COPY ./ /app/

ENTRYPOINT ["npm", "start"]