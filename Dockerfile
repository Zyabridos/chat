FROM node:20.18.1 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm ci --ignore-scripts

COPY . .



WORKDIR /app/frontend

RUN npm ci

RUN npm run build

WORKDIR /app

CMD ["npx", "start-server", "-s", "./frontend/dist"]
