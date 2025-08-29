
FROM node:18-alpine AS builder


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build

RUN ls -l /app/build


FROM node:18-alpine


WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.env ./.env 


EXPOSE 3000

CMD ["node", "./build/index.js"]
