FROM node:17.1-alpine3.12
LABEL version="0.1.0" maintainer="miguegarciatenorio@gmail.com" nodeversion=$VER

#Update container
RUN  apk update && apk upgrade  && rm -rf node_modules 

# The `--global` install dir
ENV NPM_CONFIG_PREFIX="/home/node/.npm-global"
#Set path to node modules
ENV PATH="/app/test/node_modules/.bin:${PATH}"

#Change user not root 
USER node

WORKDIR /app


COPY package*.json  ./
RUN npm --global config set user "node" \
    && npm --global --quiet --no-progress install \
    && npm cache clean --force

##RUN npm install  && npm cache clean --force

WORKDIR /app/test

CMD ["npm","run","test"] 

