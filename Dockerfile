FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci 

COPY src ./src
COPY src/config .src/config
COPY src/constants .src/constants
COPY src/models .src/models
COPY src/repositories .src/repositories
COPY src/services .src/services
COPY src/routes .src/routes
COPY src/utils .src/utils
COPY src/database .src/database
COPY src/container .src/container
COPY .env .env
COPY src/knexfile.ts .src/knexfile.ts

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/app.js"]