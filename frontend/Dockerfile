#imagem base
FROM node:20 as build

#criar uma pasta
WORKDIR /app

#copia os arquivos de configuração
COPY package*.json ./

#Instala o NPM
RUN npm install

#copia as pastas 
COPY . .

RUN npm run build

#inicializar nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80