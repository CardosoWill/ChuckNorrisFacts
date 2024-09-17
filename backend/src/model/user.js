const usersMock = new Array({
    email: "william@gmail.com",
    password: "123456"
})
class UserModel {

    findAll() {
        return usersMock
    }

}

module.exports = new UserModel();