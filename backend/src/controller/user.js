const UserModel = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config();

const saltos = parseInt(process.env.SALTS)
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
        if (!validPassword) {
            throw new Error("Email ou senha inválido. Tente novamente!")
        }

        return jwt.sign({ id: userLogged.id, email: userLogged.email }, process.env.SEGREDO, { expiresIn: 60 * 60 })
    }

    async validToken(token) {
        if (token === undefined) {
            return ("user");
        } else {
            let decoded;
            decoded = await jwt.verify(token, process.env.SEGREDO);
            const user = await this.findUser(decoded.id);
            if (user.permissao == "admin") {
                return ("admin");
            } else {
                throw new Error("Permissão não autorizada!")
            }
        }
    }
    // ========================= Criar um novo user ========================= //
    async createUser(nome, email, password, token) {
        if (!nome || !email || !password) {
            throw new Error("Name, email e password são obrigatórios.");
        }
        const emailVerific = await UserModel.findOne({ where: { email } });
        if (emailVerific) {
            throw new Error("Email já cadastrado.");
            }
        const passwordHashed = await bcrypt.hash(password, saltos);
        const user = await this.validToken(token);

        const userValue = await UserModel.create({
            nome,
            email,
            password: passwordHashed,
            permissao: user
        });

        return userValue;
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

    async findUserContext(token) {
        
        let decoded;
        try {
            decoded = await jwt.verify(token, process.env.SEGREDO);
        } catch (err) {
            throw new Error("Falha na verificação do token: " + err.message);
        }

        const userValue = await this.findUser(decoded.id);

        if (!userValue) {
            throw new Error('Usuário não encontrado.')
        }
        return userValue
    }

    // ========================= Atualiza um usuario no banco ========================= //
    async updateUser(token, nome, email) {
        let decoded;
        try {
            decoded = await jwt.verify(token, process.env.SEGREDO);
        } catch (err) {
            throw new Error("Falha na verificação do token: " + err.message);
        }
        const oldUser = await this.findUser(decoded.id);
        const emailVerific = await UserModel.findOne({ where: { email } });
        if (emailVerific !== oldUser.email && emailVerific === email) {
            throw new Error("Email já cadastrado.");
        }
        oldUser.nome = nome || oldUser.nome;
        oldUser.email = email || oldUser.email;
        oldUser.save();

        return oldUser;
    }

    async deleteUser(token) {
        if (!token) {
            throw new Error("Token é obrigatório.");
        }
        let decoded;
        try {
            decoded = await jwt.verify(token, process.env.SEGREDO);
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
