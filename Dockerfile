FROM node:17.1-alpine3.12
LABEL version="0.1.0" maintainer="miguegarciatenorio@gmail.com" nodeversion=$VER

#Update container and grant permission to new user
RUN  apk update && apk upgrade  && rm -rf node_modules \
    && mkdir -p /app  \
    && mkdir -p /app/test \
    && mkdir -p /app/coverage \
    && mkdir -p /app/test/coverage \
    && mkdir -p /app/test/src \
    && mkdir -p /app/test/src/logger \
    && mkdir -p /app/node_modules\
    && chown -R node:node  /app  \
    && chown -R node:node /app/test/coverage \
    && chown -R node:node  /app/coverage \
    &&  chown -R node:node   /app/test/src \
    && chown -R node:node /app/node_modules 

   
   

#Set path to node modules
ENV PATH="/app/node_modules/.bin:${PATH}"

#Change user not root 
USER node

WORKDIR /app

COPY package*.json  ./
RUN npm ci \
    && npm cache clean --force




WORKDIR /app/test


CMD ["npm","test"] 

