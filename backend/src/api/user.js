const UserController = require('../controller/user')

class UserApi {
    
    // ========================= Login ========================= //
    async login(req, res) {
        const { email, password } = req.body
        try {
            const token = await UserController.login(email, password) 
            res.send({ token });
        } catch (e) {
            console.log(e)
            res.status(400).send('Erro ao logar!')
        }
    }

    // ========================= Criar ========================= //
    async createUser(req, res) {
        const token = req.headers["authorization"] || undefined;
        const { nome, email, password } = req.body

        try {
            const user = await UserController.createUser(nome, email, password,token)
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
    async findContext(req, res) {
        try {
            const user = await UserController.findUser(req?.session?.id || 0)
            return res.status(200).send(user)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar usuário ${e.message}`})
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
        const { id } = req.params
        const { nome , email, password } = req.body

        try {
            const user = await UserController.updateUser(id, nome, email, password)
            return res.status(200).send(user)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar usuário ${e.message}` })
        }
    }
    // ========================= Deletar ========================= //
    async deleteUser(req, res) {
        const { id } = req.params

        try {
            await UserController.deleteUser(id)
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar usuário ${e.message}` })
        }
    }

}

module.exports = new UserApi()