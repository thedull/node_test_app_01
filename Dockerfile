FROM node:16

WORKDIR /usr/src/app

ARG NPM_TOKEN

COPY .npmrc.docker .npmrc  

COPY package.json .

RUN npm install  

RUN rm -f .npmrc

COPY . .

RUN npm run build

EXPOSE 3000 3001

# CMD ["node", "./dist/server.js"]

RUN chmod +x ./bootstrap.sh

CMD ["./bootstrap.sh"]