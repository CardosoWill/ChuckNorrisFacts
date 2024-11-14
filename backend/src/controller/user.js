const UserModel = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();
const COD = 123;
const salts = 12;
let codes = {}
class UserController {
    // ========================= Validação de Login ========================= //
    async login(email, password) {
        if (email === undefined || password === undefined || password === "") {
            throw new Error('Email e senha são obrigatórios.')
        }
        const userLogged = await UserModel.findOne({ where: { email } });

        if (!userLogged) {
            throw new Error("Email ou senha inválido. Tente novamente!")
        }

        const validPassword = await bcrypt.compare(password, userLogged.password);
        console.log(validPassword)
        if (!validPassword) {
            throw new Error("Email ou senha inválido. Tente novamente!")
        }

        return jwt.sign({ id: userLogged.id, email: userLogged.email }, 'MeuSegredo123!', { expiresIn: 60 * 60 })
    }

    async validToken(token) {
        if (token === undefined) {
            return ("user");
        } else {
            let decoded;
            decoded = await jwt.verify(token, "MeuSegredo123!");
            const user = await this.findUser(decoded.id);
            if (user.permissao == "admin") {
                return ("admin");
            } else {
                throw new Error("Permissão não autorizada!")
            }
        }
    }

    // ========================= Função para enviar Email ========================= //
        
    


    // ========================= Criar um novo user ========================= //
    async createUser(nome, email, password, token) {
        if (!nome || !email || !password) {
            throw new Error("Name, email e password são obrigatórios.");
        }

        /*const emailVerific = await UserModel.findOne({ where: { email } });

        if (emailVerific) {
            throw new Error("Email já cadastrado.");
        }*/

        const passwordHashed = await bcrypt.hash(password, salts);
        const user = await this.validToken(token);
        console.log(user);
    //Cria email e envia
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
            });
        
            const sendTestEmail = async () => {
            try {
                await transporter.sendMail({
                from: '<no_replay@gmail.com>',
                to: email,
                subject: 'Validação de email',
                text: 'Este é um e-mail de validação com Mailtrap! seu codigo de autenticação é:' + COD,
                });
                console.log('E-mail enviado com sucesso!');
            } catch (error) {
                console.error('Erro ao enviar e-mail:', error);
            }
            };
            
        sendTestEmail();

        const userValue = await UserModel.create({
            nome,
            email,
            password: passwordHashed,
            permissao: user,
            status: "desbloqueado"
        });
       return userValue;
    }

    async validEmailUser(tokenMFA) {
        if (tokenMFA === undefined) {
            console.log("03")
            throw new Error('Token MFA é obrigatório.')
        }
        console.log("02")
        return tokenMFA
    }

    // ========================= Pega todos os users ========================= //
    async findAll() {
        return UserModel.findAll();
    }

    async findUser(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }

        const userValue = await UserModel.findByPk(id)

        if (!userValue) {
            throw new Error('Usuário não encontrado.')
        }

        return userValue
    }

    // ========================= Atualiza um usuario no banco ========================= //
    async updateUser(token, nome, email, password) {
        if (!token || !nome || !email || !password) {
            throw new Error("Token, nome, email e senha são obrigatórios.");
        }

        let decoded;
        try {
            decoded = await jwt.verify(token, "MeuSegredo123!");
        } catch (err) {
            throw new Error("Falha na verificação do token: " + err.message);
        }

        const user = await this.findUser(decoded.id);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        // Verifica se o novo email já está em uso
        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser && existingUser.id !== user.id) {
            throw new Error("Email já está em uso por outro usuário.");
        }

        user.nome = nome;
        if (user.email !== email) {
            user.email = email;
        }
        user.password = await bcrypt.hash(password, salts);
        await user.save(); // Adicionei await para garantir que a atualização seja concluída

        return user;
    }

    async deleteUser(token) {
        if (!token) {
            throw new Error("Token é obrigatório.");
        }
        let decoded;
        try {
            decoded = await jwt.verify(token, "MeuSegredo123!");
        } catch (err) {
            throw new Error("Falha na verificação do token: " + err.message);
        }

        const user = await this.findUser(decoded.id);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
        await user.destroy()

        return;
    }
}

module.exports = new UserController;
