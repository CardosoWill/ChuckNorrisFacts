const JokeController = require('../controller/fatos')

class JokeApi {
    // ========================= Buscar Piada Aleatória ========================= //
    async getRandomJoke(req, res) {
        try {
            const joke = await JokeController.getRandomJoke()
            res.send( joke );
        } catch (e) {
            console.log(e)
            res.status(400).send('Erro ao buscar piada aleatória!')
        }
    }

// ========================= Criar Piadas ========================= //
async createJoke(req, res) {
    const {categoria, texto} = req.body;
    try {
        console.log("aqui")
        const createdJokes = await JokeController.createJokes(categoria,texto); 
        return res.status(201).send(createdJokes); 
    } catch (e) {
        return res.status(400).send({ error: `Erro ao criar piadas: ${e.message}` });
    }
}

    // ========================= Buscar todas as Piadas ========================= //
    async findAllJokes(req, res) {
        try {
            const jokes = await JokeController.findAll()
            res.send({ jokes });
        } catch (e) {
            console.log(e)
            res.status(400).send('Erro ao buscar todas as piadas!')
        }
    }

    // ========================= Buscar Piada por ID ========================= //
    async findJokeById(req, res) {
        const { idFatos } = req.params
        try {
            const joke = await JokeController.findJokeById(idFatos)
            res.send({ joke });
        } catch (e) {
            console.log(e)
            res.status(400).send('Erro ao buscar piada por ID!')
        }
    }

    // ========================= Atualizar Piada ========================= //
    async updateJoke(req, res) {
        const { id } = req.params
        const { texto } = req.body

        try {
            const joke = await JokeController.updateJoke(id, texto)
            return res.status(200).send(joke)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao atualizar piada: ${e.message}` })
        }
    }

    // ========================= Deletar Piada ========================= //
    async deleteJoke(req, res) {
        const { id } = req.params

        try {
            await JokeController.deleteJoke(id)
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar piada: ${e.message}` })
        }
    }
}

module.exports = new JokeApi()
