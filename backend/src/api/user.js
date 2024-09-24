const UserController = require('../controller/user')

class UserApi {
    
    findUser(req, res) {

        console.log("api", req.session)
        try {
            const users = UserController.findAll()
            res.send({ users });
        }catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }

    createUser(req, res){
        try {
            res.send('post');
        }catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }

    
    updateUser(req, res){
        try {
            res.send('post');
        }catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }

    
    deleteUser(req, res){
        try {
            res.send('delete');
        }catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }

    async login(req, res) {
        const {email, password } = req.body
        try {
            const token = await UserController.login(email, password)
            res.send({ token });
        }catch (e) {
            console.log(e)
            res.status(400).send('Deu erro')
        }
    }
}

module.exports = new UserApi()