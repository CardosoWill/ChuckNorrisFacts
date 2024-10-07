const express = require('express');
const JokeApi = require('../api/fatos');

const jokeRouter = express.Router();

jokeRouter.get('/random', JokeApi.getRandomJoke);
jokeRouter.post('/', JokeApi.createJoke);
jokeRouter.get('/',authMiddleware("admin"), JokeApi.findAllJokes);
jokeRouter.get('/:idFatos', JokeApi.findJokeById);
jokeRouter.put('/:idFatos', authMiddleware("admin"),JokeApi.updateJoke);
jokeRouter.delete('/:idFatos',authMiddleware("admin"), JokeApi.deleteJoke);

module.exports = jokeRouter;
