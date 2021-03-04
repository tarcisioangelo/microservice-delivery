FROM node:alpine

RUN mkdir /usr/app

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn --production

COPY . ./

EXPOSE 5000

CMD ["yarn", "start"]

# cd source
# docker build -t autoclubes/srv-gateway -f docker/prod.Dockerfile .
# docker run --name gateway -p 5000:5000 -d srv-gateway
