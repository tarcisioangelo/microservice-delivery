FROM node:alpine

RUN mkdir /usr/app

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn --production

COPY . ./

EXPOSE 4002

CMD ["yarn", "start"]
