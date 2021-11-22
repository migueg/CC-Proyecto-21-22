FROM node:17.1-alpine3.12
LABEL version="0.1.0" maintainer="miguegarciatenorio@gmail.com" nodeversion=$VER

#Set workdir
WORKDIR /app/test

#Set as root for instalation
USER root

#Update container
RUN  apk update && apk upgrade 

#Install dependencies
COPY package*.json  ./
RUN npm install -g concurrently && npm cache clean --force

#Change user not root for runtime
USER node

CMD ["npm","run","test"] 

