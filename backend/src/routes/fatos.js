const express = require('express');
const JokeApi = require('../api/fatos');

const jokeRouter = express.Router();

jokeRouter.get('/random', JokeApi.getRandomJoke);
jokeRouter.post('/', JokeApi.createJoke);
jokeRouter.get('/', JokeApi.findAllJokes);
jokeRouter.get('/:idFatos', JokeApi.findJokeById);
jokeRouter.put('/:idFatos', JokeApi.updateJoke);
jokeRouter.delete('/:idFatos', JokeApi.deleteJoke);

module.exports = jokeRouter;
