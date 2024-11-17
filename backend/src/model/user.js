const database = require('../config/database');

class UserModel {

        constructor() {
            this.model = database.db.define("users", {
                id: {
                    type: database.db.Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                nome: {
                    type: database.db.Sequelize.STRING,
                    allowNull: false
                },
                email: {
                    type: database.db.Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: database.db.Sequelize.STRING,
                    allowNull: false
                },
                permissao: {
                    type: database.db.Sequelize.STRING,
                    validate: {
                      isIn: [["admin", "user","bloqueado"]],
                    },
                  },
            })
        }

}

module.exports = (new UserModel()).model;