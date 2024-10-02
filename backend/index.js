const express = require('express');
const UserApi = require('./src/api/user')
const useRouter = require('./src/routes/user');
const jokeRouter = require('./src/routes/fatos');
const database = require('./src/config/database');

const app = express();

app.use(express.json({ limit: '50mb' }));

// Rota sem token
app.post('/api/v1/login', UserApi.login)

// Rota com token
app.use("/api/v1/user", useRouter);
app.use("/api/v1/jokes", jokeRouter);


database.db
    .sync({ force: false }) // Não apaga os dados existentes ao sincronizar
    .then(() => {
        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000");
        });
    })
    .catch((e) => {
        console.error("Erro ao conectar com o banco: ", e);
    });
