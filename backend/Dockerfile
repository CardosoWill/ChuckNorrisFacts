#imagem base
FROM node:20.8

#criar uma pasta
WORKDIR /app

#copia as pastas 
COPY . .

#Instala o NPM
RUN npm i

EXPOSE 3000

CMD [ "npm","start" ]