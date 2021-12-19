FROM node:14.17-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .


FROM node:14.17-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist


CMD ["node", "dist/main"]
