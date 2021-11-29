FROM node

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . ./usr/app

EXPOSE 8080

CMD ["npm", "run", "dev"] 