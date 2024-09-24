const express = require('express');
const UserApi = require('../api/user');
const authMiddleware = require('../middleware/auth');

const useRouter = express.Router();

useRouter.post('/login', UserApi.login)
useRouter.get('/', authMiddleware, UserApi.findUser);
useRouter.post('/', UserApi.createUser);
useRouter.put('/:id', UserApi.updateUser);
useRouter.delete('/:id', UserApi.deleteUser);

module.exports = useRouter;
