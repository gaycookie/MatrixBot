FROM node:16-alpine

WORKDIR /etc/bot
COPY . .

RUN npm install
CMD [ "npm", "run", "develop" ]