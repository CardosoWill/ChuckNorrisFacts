const express = require('express');
const cors = require("cors");
require('dotenv').config();
const authMiddleware = require('./src/middleware/auth');
const database = require('./src/config/database');
const UserApi = require('./src/api/user')
const useRouter = require('./src/routes/user');
const jokeRouter = require('./src/routes/fatos');
const UserModel = require('./src/model/user')
const bcrypt = require('bcrypt');
require('dotenv').config();

const saltos = parseInt(process.env.SALTS)

const app = express();
app.use(express.json());
app.use(cors());

// Rota sem token
app.post('/api/v1/login', UserApi.login)
app.post('/api/v1/create', UserApi.createUser);

// Rota com token
app.use("/api/v1/user", authMiddleware(),useRouter);
app.use("/api/v1/jokes", authMiddleware(),jokeRouter);

// Função para criar um usuário administrador se não existir
async function createAdminUser() {
    try {
        // Verifica se o administrador já existe
        const adminExists = await UserModel.findOne({ where: { permissao: 'admin' } });

        if (!adminExists) {
            // Criptografa a senha do administrador
            const hashedPassword = await bcrypt.hash(process.env.SENHA_ADM, saltos);

            // Cria o usuário administrador
            await UserModel.create({
                nome: process.env.NAME_ADM,
                email: process.env.EMAIL_ADM,
                password: hashedPassword,
                permissao: 'admin',
            });
        } 
    } catch (error) {
        console.error('Erro ao criar usuário administrador:', error);
    }
}
database.db
    .sync({ force: false }) // Não apaga os dados existentes ao sincronizar
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Servidor rodando na porta "+process.env.PORT);
        });
        createAdminUser();
    })
    .catch((e) => {
        console.error("Erro ao conectar com o banco: ", e);
    });
