FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN mkdir -p /usr/src/app/uploads

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/src/main"]
