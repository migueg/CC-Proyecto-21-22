FROM node:17.1-alpine3.12
LABEL version="0.1.0" maintainer="miguegarciatenorio@gmail.com" nodeversion=$VER

#Update container and grant permission to new user
RUN  apk update && apk upgrade  && rm -rf node_modules \
    && mkdir -p /app  \
    && mkdir -p /app/test \
    && mkdir -p /app/coverage \
    && mkdir -p /app/test/coverage \
    && mkdir -p /app/test/src \
    && mkdir -p /app/node_modules \
    && mkdir -p /app/test/logs \
    && mkdir -p /app/test/src/logger 
   
   

#Set path to node modules
ENV PATH="/app/node_modules/.bin:${PATH}"

RUN npm config set unsafe-perm true

    
#Change user not root 

RUN chown -R node:node /app && chmod -R  777 /app

USER node:node


WORKDIR /app

COPY package*.json  ./
RUN npm ci \
    && npm cache clean --force

WORKDIR /app/test


   
CMD ["npm","test"] 

