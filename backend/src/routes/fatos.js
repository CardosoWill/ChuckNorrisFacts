const express = require('express');
const JokeApi = require('../api/fatos');
const authMiddleware = require('../middleware/auth');

const jokeRouter = express.Router();

jokeRouter.post('/', authMiddleware("admin"),JokeApi.createJoke);
jokeRouter.get('/random',JokeApi.getRandomJoke);
jokeRouter.get('/',authMiddleware("user","admin"), JokeApi.findAllJokes);
jokeRouter.get('/:id', authMiddleware("user","admin"),JokeApi.findJokeById);
jokeRouter.put('/:id', authMiddleware("admin"),JokeApi.updateJoke);
jokeRouter.delete('/:id',authMiddleware("admin"), JokeApi.deleteJoke);

module.exports = jokeRouter;
