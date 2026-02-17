FROM node:25.4-slim

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

ENTRYPOINT ["npm", "run", "dev"]
