const JokeModel = require('../model/fatos');

class JokeController {

    async getRandomJoke() {
        const joke = await JokeModel.findOne({
            order: JokeModel.sequelize.random()
        });
        return joke;
    }
    
    async createJokes(categoria,texto) {
        if (!categoria) {
            throw new Error("É necessário Ter uma categoria.");
        }
        if (!texto) {
            throw new Error("É necessário Ter um Texto.");
        }

        const jokeExists = await JokeModel.findOne({ where: { texto } });

        if (jokeExists) {
            throw new Error('Piada já cadastrada');
        }

        const jokeValue = await JokeModel.create({
            categoria,
            texto
        });

        return jokeValue;
    }
    
    async findAll() {
        return JokeModel.findAll();
    }

    async findJokeById(idFatos) {
        if (!idFatos) {
            throw new Error("ID é obrigatório.");
        }

        const joke = await JokeModel.findByPk(idFatos);

        if (!joke) {
            throw new Error("Piada não encontrada.");
        }

        return joke;
    }

    async updateJoke(id, texto) {
        if (!id || !texto) {
            throw new Error("texto da piada, da piada é obrigatório.");
        }

        const jokeValue = await this.findJokeById(id);
    
        jokeValue.texto = texto;
        

        await jokeValue.save();

        return jokeValue;
    }

    async deleteJoke(id) {
        if (!id) {
            throw new Error("ID é obrigatório.");
        }

        const jokeValue = await this.findJokeById(id);

        await jokeValue.destroy();

        return;
    }
}

module.exports = new JokeController();