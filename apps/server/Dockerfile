FROM node:21-alpine3.17 AS build

RUN apk --no-cache add curl

WORKDIR /app

COPY package*.json ./

WORKDIR /app
COPY apps/server ./

RUN npm install --save-dev @types/node

RUN npm run build

EXPOSE 8080
EXPOSE 5000

ENTRYPOINT ["npm", "run", "prodstart"]
