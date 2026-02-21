FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 7100
CMD ["npx", "vite", "preview", "--port", "7100", "--host", "0.0.0.0"]
