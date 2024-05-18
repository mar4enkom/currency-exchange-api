FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8000

FROM base AS development

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

CMD ["npm", "run", "dev"]

FROM base AS production

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

CMD ["npm", "start"]
