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
async function createPiadas() {
    try {   
        const piadaExists = await JokeModel.findOne({
            order: JokeModel.sequelize.random() // Pega uma piada aleatória do banco
        });
        if (!piadaExists) { 
            await JokeModel.create(
                {
                    categoria: "animal",
                    texto: "Se você perguntar a Chuck Norris, 'qual é o som de uma mão batendo palmas?', ele prontamente lhe dará um tapa."
                },{ 
                    categoria: "celebridade",
                    texto: "Uma vez eu inventei uma piada muito engraçada sobre Chuck Norris e decidi contá-la ao próprio Homem antes de qualquer outra pessoa no mundo. Ao ouvir a piada, Chuck Norris me deu um chute rápido na lateral da cabeça, já que não consigo lembrar o que era aquela piada." 
                },{ 
                    categoria: "desenvolvimento",
                    texto: "Chuck Norris leva o Optimus Prime para o trabalho." 
                }/*,{ 
                    categoria: "moda",
                    texto: "Chuck Norris não inventou o disruptor parabólico de hemorróidas e é por isso que você nunca ouviu falar dele antes." 
                },{ 
                    categoria: "comida",
                    texto: "Everybody knows that Chuck Norris blows smoke rings when he smokes cigars. But did you know that after eating Texas Chili, he often shows-off by blowing blazing fart rings." 
                },{ 
                    categoria: "história",
                    texto: "O nome Apache de Chuck Norris é Chuck Norris."  
                },{
                    categoria: "dinheiro",
                    texto: "Chuck Norris mantém um lançador de granadas escondido dentro de seu piano de cauda."  
                },{
                    categoria: "filme",
                    texto: "A teoria do big bang: Chuck Norris Perdendo uma queda de braço com Deus"  
                },{
                    categoria: "música",
                    texto: "Big Foot afirma que tem algumas fotos de Chuck Norris... Todos os seus amigos acham que ele é um mentiroso."  
                },{
                    categoria: "ciência",
                    texto: "Huck Norris gosta de seu café meio a meio: meio pó de café, meio álcool de madeira."  
                },{
                    categoria: "esporte",
                    texto: "Chuck Norris tem uma coisa chamada round house"  
                },{
                    categoria: "viagem",
                    texto: "Huck Norris pode apertar o gatilho."  
                }*/
            ); 
        }           
    } catch (error) {
        console.error('Erro ao criar Piadas:', error);
    }
}
database.db
    .sync({ force: true }) // Não apaga os dados existentes ao sincronizar
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
