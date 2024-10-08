const express = require('express');
const JokeApi = require('../api/fatos');
const authMiddleware = require('../middleware/auth');

const jokeRouter = express.Router();

jokeRouter.get('/random',JokeApi.getRandomJoke);
jokeRouter.post('/', authMiddleware("user","admin"),JokeApi.createJoke);
jokeRouter.get('/',authMiddleware("admin"), JokeApi.findAllJokes);
jokeRouter.get('/:idFatos', authMiddleware("user","admin"),mJokeApi.findJokeById);
jokeRouter.put('/:idFatos', authMiddleware("admin"),JokeApi.updateJoke);
jokeRouter.delete('/:idFatos',authMiddleware("admin"), JokeApi.deleteJoke);

module.exports = jokeRouter;
