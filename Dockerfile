FROM node:17.1-alpine3.12
LABEL version="0.1.0" maintainer="miguegarciatenorio@gmail.com" nodeversion=$VER

#Update container and grant permission to new user
RUN  apk update && apk upgrade  && rm -rf node_modules \
    && adduser -S migue  \
    && mkdir /app  \
    && mkdir /app/test \
    && mkdir /app/coverage \
    && mkdir /app/test/coverage \
    && mkdir /app/test/src \
    && mkdir /app/test/src/logger \
    && chmod 777 /app  \
    && chmod 777 /app/test/coverage \
    && chmod 777  /app/coverage \
    &&  chmod 777  /app/test/src

   
   

#Set path to node modules
ENV PATH="/app/node_modules/.bin:${PATH}"

#Change user not root 
USER migue

WORKDIR /app

COPY package*.json  ./
RUN npm ci \
    && npm cache clean --force


WORKDIR /app/test


CMD ["npm","test"] 

