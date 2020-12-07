FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm ci --only=production

COPY index.js index.js
COPY src src

ENV POST=5000
EXPOSE 5000
CMD [ "node", "index.js" ]