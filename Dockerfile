FROM node:17.1-alpine3.12
LABEL version="0.1.0" maintainer="miguegarciatenorio@gmail.com" nodeversion=$VER

#Set workdir
WORKDIR /app/test


#Update container
RUN  apk update && apk upgrade 

#Change user not root for runtime
#Install dependencies
COPY package*.json  ./
RUN npm install  && npm cache clean --force

USER node
COPY --chown=node:node . /app/test/

CMD ["npm","run","test"] 

