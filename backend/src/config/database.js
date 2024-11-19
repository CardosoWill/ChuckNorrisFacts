const { Sequelize } = require("sequelize");
require('dotenv').config();

class Database {

    constructor() {
        this.init();
    }
    
    init(){
        this.db = new Sequelize({
            database:process.env.DB_DATABASE,
            host:process.env.DB_HOST,
            password:process.env.DB_PASSWORD,
            username:process.env.DB_USERNAME,
            dialect:process.env.DB_DIALECT
        })
    }
}

module.exports = new Database();