FROM node:16

WORKDIR /etc/bot
COPY . .

RUN npm install
CMD [ "npm", "run", "develop" ]