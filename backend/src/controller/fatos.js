const JokeModel = require('../model/fatos');

class JokeController {

   

    // ========================= Buscar Piada Aleatória ========================= //
    async getRandomJoke() {
        const joke = await JokeModel.findOne({
            order: JokeModel.sequelize.random() // Pega uma piada aleatória do banco
        });
        return joke;
    }

    // ========================= Criar uma nova piada ou múltiplas piadas ========================= //
    
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
    
    // ========================= Pega todas as piadas ========================= //
    async findAll() {
        return JokeModel.findAll();
    }

    // ========================= Pega uma piada pelo ID ========================= //
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

    // ========================= Atualiza uma piada no banco ========================= //
    async updateJoke(id, texto) {
        if (!id || !texto) {
            throw new Error("texto da piada, da piada é obrigatório.");
        }

        const jokeValue = await this.findJokeById(id);
    
        jokeValue.texto = texto;
        

        await jokeValue.save();

        return jokeValue;
    }

    // ========================= Deleta uma piada do banco ========================= //
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