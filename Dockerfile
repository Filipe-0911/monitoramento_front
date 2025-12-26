FROM node:20-alpine AS build

WORKDIR /app

ARG VITE_LOGIN_API
ENV VITE_LOGIN_API=$VITE_LOGIN_API

COPY package*.json ./
RUN npm install

COPY . .
# Define um argumento de build que pode ser passado via linha de comando
ARG VITE_LOGIN_API

# Define a variável de ambiente dentro do container para que o comando 'npm run build' a veja
ENV VITE_LOGIN_API=$VITE_LOGIN_API

RUN echo $VITE_LOGIN_API

RUN npm run build

# Runtime
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
