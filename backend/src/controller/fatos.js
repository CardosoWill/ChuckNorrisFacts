const JokeModel = require('../model/fatos');

class JokeController {

   

    // ========================= Buscar Piada Aleatória ========================= //
    async getRandomJoke() {
        const joke = await JokeModel.findOne({
            order: JokeModel.sequelize.random() // Pega uma piada aleatória do banco
        });
        return joke.texto;
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
    async updateJoke(idFatos, id, category, icon_url, url, value, created_at, updated_at) {
        if (!idFatos || !id || !value || !icon_url || !url) {
            throw new Error("ID, valor da piada, URL do ícone e URL da piada são obrigatórios.");
        }

        const jokeValue = await this.findJokeById(idFatos);
        
        jokeValue.id = id;
        jokeValue.category = category;
        jokeValue.icon_url = icon_url;
        jokeValue.url = url;
        jokeValue.value = value;
        jokeValue.created_at = created_at;
        jokeValue.updated_at = updated_at;

        await jokeValue.save();

        return jokeValue;
    }

    // ========================= Deleta uma piada do banco ========================= //
    async deleteJoke(idFatos) {
        if (!idFatos) {
            throw new Error("ID é obrigatório.");
        }

        const jokeValue = await this.findJokeById(idFatos);

        await jokeValue.destroy();

        return;
    }
}

module.exports = new JokeController();