const UserController = require('../controller/user')

class UserApi {
    
    findUser(req, res) {
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
}

module.exports = new UserApi()