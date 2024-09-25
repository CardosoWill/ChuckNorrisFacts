const UserModel = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const salts = 12;
class UserController {


    // ========================= Validação de Login ========================= //
    async login(email, password) {
        const userLogged = await UserModel.findOne({ where: { email } });

        if (!userLogged) {
            throw new Error("Email ou senha inválido. Tente novamente!")
        }

        const validPassword = userLogged.password === password;

        if (!validPassword) {
            throw new Error("Email ou senha inválido. Tente novamente!")
        }

        return jwt.sign({ id: userLogged.id, email: userLogged.email }, 'MeuSegredo123!', { expiresIn: 60 * 60 })
    }

    // ========================= Criar um novo user ========================= //
    async createUser(nome, email, password) {
        if (!nome || !email || !password) {
            throw new Error("Name, email e password são obrigatórios.")
        }

        const emailVerific = await UserModel.findOne({ where: { email } });

        if (emailVerific) {
            throw new Error("Email já cadastrado.");
        }

        const passwordHashed = await bcrypt.hash(password, salts)

        const userValue = await UserModel.create({
            nome,
            email,
            password: passwordHashed,
        })
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


    // ========================= Atualiza um usuario no banco ========================= //
    async updateUser(id, name, email, password) {
        if (!id || !name || !email || !password) {
            throw new Error("Id, name, email e password são obrigatórios.");
        }

        const emailVerific = await UserModel.findOne({ where: { email } });

        if (emailVerific) {
            throw new Error("Email já cadastrado.");
        }

        const userValue = await this.findUser(id)

        userValue.nome = nome
        userValue.email = email
        userValue.password = await bcrypt.hash(password, salts)
        userValue.save()

        return userValue
    }


    async deleteUser(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }
        const userValue = await this.findUser(id)
        userValue.destroy()

        return
    }
}

module.exports = new UserController;