FROM node:20.18.1

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest
RUN npm ci --ignore-scripts

COPY . .

WORKDIR /app/frontend
RUN npm ci

RUN npm run build

WORKDIR /app

ENV PORT=3000

CMD ["npx", "start-server", "-s", "./frontend/dist"]
