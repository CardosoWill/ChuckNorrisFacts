const express = require('express');
const cors = require("cors");
require('dotenv').config();
const authMiddleware = require('./src/middleware/auth');
const database = require('./src/config/database');
const UserApi = require('./src/api/user')
const useRouter = require('./src/routes/user');
const jokeRouter = require('./src/routes/fatos');
const UserModel = require('./src/model/user')
const JokeModel = require('./src/model/fatos')
const bcrypt = require('bcrypt');
require('dotenv').config();

const saltos = parseInt(process.env.SALTS)

const app = express();
app.use(express.json());
app.use(cors());


app.post('/api/v1/login', UserApi.login)
app.post('/api/v1/create', UserApi.createUser);


app.use("/api/v1/user", authMiddleware(),useRouter);
app.use("/api/v1/jokes", authMiddleware(),jokeRouter);

async function createAdminUser() {
    try {

        const adminExists = await UserModel.findOne({ where: { permissao: 'admin' } });

        if (!adminExists) {

            const hashedPassword = await bcrypt.hash(process.env.SENHA_ADM, saltos);

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
async function createPiadas() {
    try {   
        const piadaExists = await JokeModel.findOne({
            order: JokeModel.sequelize.random()
        });
        if (!piadaExists) { 
            await JokeModel.create(
                {
                    categoria: "animal",
                    texto: "Se você perguntar a Chuck Norris, 'qual é o som de uma mão batendo palmas?', ele prontamente lhe dará um tapa."
                }
            );
            await JokeModel.create(
                {
                    categoria: "celebridade",
                    texto: "Uma vez eu inventei uma piada muito engraçada sobre Chuck Norris e decidi contá-la ao próprio Homem antes de qualquer outra pessoa no mundo. Ao ouvir a piada, Chuck Norris me deu um chute rápido na lateral da cabeça, já que não consigo lembrar o que era aquela piada." 
                }
            );
        }           
    } catch (error) {
        console.error('Erro ao criar Piadas:', error);
    } 
}
database.db
    .sync({ force: false }) 
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Servidor rodando na porta "+process.env.PORT);
        });
        createAdminUser();
        createPiadas();
    })
    .catch((e) => {
        console.error("Erro ao conectar com o banco: ", e);
    });
