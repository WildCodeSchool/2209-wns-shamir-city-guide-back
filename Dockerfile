FROM node:18 as base
WORKDIR /app
COPY package*.json ./

FROM base as development
RUN npm install

FROM base as production
RUN NPM ci