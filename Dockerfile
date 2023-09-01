FROM node:alpine

WORKDIR /usr/src/app

COPY *.json .
COPY ./src ./src

RUN npm install

CMD [ "npm", "start" ]
