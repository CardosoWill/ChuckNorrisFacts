const express = require('express');
const cors = require("cors");
require('dotenv').config();
const authMiddleware = require('./src/middleware/auth');
const database = require('./src/config/database');
const UserApi = require('./src/api/user')
const useRouter = require('./src/routes/user');
const jokeRouter = require('./src/routes/fatos');

const app = express();
app.use(express.json());
app.use(cors());

// Rota sem token
app.post('/api/v1/login', UserApi.login)
app.post('/api/v1/create', UserApi.createUser);

// Rota com token
app.use("/api/v1/user", authMiddleware(),useRouter);
app.use("/api/v1/jokes", authMiddleware(),jokeRouter);


database.db
    .sync({ force: false }) // Não apaga os dados existentes ao sincronizar
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Servidor rodando na porta "+process.env.PORT);
        });
    })
    .catch((e) => {
        console.error("Erro ao conectar com o banco: ", e);
    });
