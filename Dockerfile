FROM node:20-alpine AS base

WORKDIR /app
COPY . .

RUN yarn install && yarn build


RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3002


CMD ["yarn", "start"]