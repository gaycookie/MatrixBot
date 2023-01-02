FROM node:16

WORKDIR /data
COPY package.json .
COPY build build
COPY config-example.yaml config.yaml

RUN npm install --production

CMD [ "npm", "run", "start" ]