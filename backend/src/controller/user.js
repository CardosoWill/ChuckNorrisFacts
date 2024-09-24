const UserModel = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const salts = 12;
class UserController {

    async createUser(name, email, password) {
        if (!name || !email || !password) {
            throw new Error("Name, email e password são obrigatórios.")
        }

        const passwordHashed = bcrypt.hash(password, salts)

        const userValue = await user.create({
            name,
            email,
            password,
        })
        return userValue;
    }

    findAll() {
        return user.findAll();
    }

    async login(email, password) {
        const userLogged = await user.findOne({ where: { email }});

        if(!userLogged) {
            throw new Error("Email ou senha inválido. Tente novamente!")
        }

        const validPassword = userLogged.password === password;
        
        if(!validPassword) {
            throw new Error("Email ou senha inválido. Tente novamente!")
        }

        return jwt.sign({ id: userLogged.id, email: userLogged.email },
            'MeuSegredo123!'

        )
    }
}

module.exports = new UserController;