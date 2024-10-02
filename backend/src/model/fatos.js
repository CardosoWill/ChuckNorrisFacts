const database = require('../config/database');

class JokeModel {
    constructor() {
        this.model = database.db.define("fatos", {

            idFatos: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },                
            id: {
                type: database.db.Sequelize.STRING,
            },
            category: {
                type: database.db.Sequelize.STRING,
                allowNull: true
            },
            icon_url: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            url: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            value: {
                type: database.db.Sequelize.TEXT,
                allowNull: false
            },
            created_at: {
                type: database.db.Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: database.db.Sequelize.DATE,
                allowNull: false
            }
        });
    }
}

module.exports = (new JokeModel()).model;
