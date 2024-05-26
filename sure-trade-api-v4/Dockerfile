FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --force


COPY . .
RUN npm run build

ENV PORT 4007

EXPOSE 4007


CMD [ "npm", "run", "start:dev" ]

