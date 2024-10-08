const UserController = require('../controller/user')

class UserApi {
    // ========================= Login ========================= //
    async login(req, res) {
        const { email, password } = req.body
        try {
            const token = await UserController.login(email, password) // corrigir, trocar senha por id, não esquecer
            res.send({ token });
        } catch (e) {
            console.log(e)
            res.status(400).send('Erro ao logar!')
        }
    }

    // ========================= Criar ========================= //
    async createUser(req, res) {
        const token = req.headers["authorization"];
        const { nome, email, password } = req.body

        try {
            const user = await UserController.createUser(token,nome, email, password)
            return res.status(201).send(user)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar usuário ${e.message}` })
        }
    }


    // ========================= Buscar todos ========================= //
    async userFindAll(req, res) {

        try {
            const users = await UserController.findAll()
            res.send({ users });
        } catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }

        // ========================= Buscar por ID ========================= //
        async userFind(req, res) {
            const { id } = req.params
            try {
                const users = await UserController.findUser(id)
                res.send({ users });
            } catch (e) {
                console.log(e)
                res.status(400).send('Deu erro')
            }
        }
    
    // ========================= Atualizar ========================= //
    async updateUser(req, res) {
        const token = req.headers["authorization"];
        const { nome , email, password } = req.body

        try {
            const user = await UserController.updateUser(token, nome, email, password)
            return res.status(200).send(user)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar usuário ${e.message}` })
        }
    }
    // ========================= Deletar ========================= //
    async deleteUser(req, res) {
        const token = req.headers["authorization"];

        try {
            await UserController.deleteUser(token)
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar usuário ${e.message}` })
        }
    }

}

module.exports = new UserApi()