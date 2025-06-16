FROM node:22-alpine

WORKDIR /app

COPY ./package.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build

CMD ["npm", "run", "start"]
