const express = require('express');
const UserApi = require('../api/user');
const authMiddleware = require('../middleware/auth');

const useRouter = express.Router();

useRouter.post('/', authMiddleware("admin"), UserApi.createUser);
useRouter.get('/',  authMiddleware("admin"), UserApi.userFindAll);
useRouter.get('/:id', authMiddleware("admin"), UserApi.userFind);
useRouter.put('/', UserApi.updateUser);
useRouter.delete('/', UserApi.deleteUser);

module.exports = useRouter;
