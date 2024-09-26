const express = require('express');
const UserApi = require('../api/user');
const authMiddleware = require('../middleware/auth');

const useRouter = express.Router();

useRouter.post('/login', UserApi.login);
useRouter.post('/', UserApi.createUser);
useRouter.get('/',  UserApi.userFindAll);
useRouter.get('/:id',  UserApi.userFind);
useRouter.put('/:id', UserApi.updateUser);
useRouter.delete('/:id', UserApi.deleteUser);

module.exports = useRouter;
