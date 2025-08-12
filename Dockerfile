
# Dockerfile para backend + frontend
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --workspace frontend

EXPOSE 3000

CMD ["npm", "start"]
