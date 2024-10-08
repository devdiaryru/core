FROM node:20-alpine

LABEL org.opencontainers.image.source https://github.com/devdiaryru/core

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g @nestjs/cli

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 8080

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]