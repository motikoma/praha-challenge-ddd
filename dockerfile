FROM --platform=linux/arm64 node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

CMD ["npm", "run", "start:prod"]