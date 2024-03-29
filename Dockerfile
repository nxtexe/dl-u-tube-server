FROM node:20.1.0

WORKDIR /usr/app

COPY . ./

RUN npm ci

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]