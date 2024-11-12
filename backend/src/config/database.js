const { Sequelize } = require("sequelize");

class Database {

    constructor() {
        this.init();
    }
    
    init(){
        this.db = new Sequelize({
            database:"exemplo",
            host:"localhost",
            password:"123456",
            username:"root",
            dialect:"mysql"
        })
    }
}

module.exports = new Database();