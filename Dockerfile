FROM node:lts-alpine AS builder
RUN apk add --no-cache git

LABEL Version="1.0"
LABEL Name="carra"

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# ENV_FILE is '.env.development' | '.env.staging' | '.env.production'
ARG ENV_FILE
RUN mv $ENV_FILE .env.production
RUN yarn build

FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app/.env.production /app/.env.production
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD yarn start
