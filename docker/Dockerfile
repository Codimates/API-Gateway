FROM node:18-alpine

WORKDIR /usr/src/app

RUN npm install -g nodemon
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

ENV NAME api-gateway

CMD ["npm", "start"]
