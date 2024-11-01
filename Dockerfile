FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .
COPY next.config.mjs ./next.config.mjs

EXPOSE 3000

CMD ["npm", "run", "dev"]
