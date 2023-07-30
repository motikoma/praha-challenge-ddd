FROM --platform=linux/arm64 node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci

# Dockerイメージのビルド時にPrismaクライアントを生成
RUN npx prisma generate

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]