FROM node:20-alpine AS build

WORKDIR /app

# Define o argumento de build (padrão: /api para uso com o proxy Nginx)
ARG VITE_LOGIN_API=/api
ENV VITE_LOGIN_API=$VITE_LOGIN_API

COPY package*.json ./
RUN npm install

COPY . .

RUN echo "Building frontend with VITE_LOGIN_API=$VITE_LOGIN_API"
RUN npm run build

# Runtime
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
