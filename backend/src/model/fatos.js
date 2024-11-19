const database = require('../config/database');

class JokeModel {
    constructor() {
        this.model = database.db.define("fatos", {

            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },                
            category: {
                type: database.db.Sequelize.STRING,
                allowNull: true,
                validate: {
                    isIn: {
                        args: [
                            [
                                "animal",
                                "celebridade",
                                "desenvolvimento",
                                "moda",
                                "comida",
                                "história",
                                "dinheiro",
                                "filme",
                                "música",
                                "ciência",
                                "esporte",
                                "viagem",
                            ],
                        ],
                        msg: "Categoria inválida. Escolha uma das opções permitidas.",
                    },
                },
            },
            texto: {
                type: database.db.Sequelize.TEXT,
                allowNull: false
            }
        });
    }
}

module.exports = (new JokeModel()).model;
