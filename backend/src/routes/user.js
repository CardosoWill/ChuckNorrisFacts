const express = require('express');
const UserApi = require('../api/user');
const authMiddleware = require('../middleware/auth');

const useRouter = express.Router();

useRouter.get('/',  authMiddleware("admin"), UserApi.userFindAll);
useRouter.get('/:id', authMiddleware("admin"), UserApi.userFind);
useRouter.get('/context', UserApi.findContext);
useRouter.put('/:id', UserApi.updateUser);
useRouter.delete('/:id', UserApi.deleteUser);

module.exports = useRouter;
