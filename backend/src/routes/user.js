const express = require('express');
const UserApi = require('../api/user');
const authMiddleware = require('../middleware/auth');

const useRouter = express.Router();

useRouter.get('/context', UserApi.findContext);
useRouter.put('/:id', UserApi.updateAdmin);
useRouter.put('/', UserApi.updateUser);
useRouter.delete('/', UserApi.deleteUser);
useRouter.delete('/:id', UserApi.deleteAdmin);
useRouter.get('/:id', authMiddleware("admin"), UserApi.userFind);
useRouter.get('/',  authMiddleware("admin"), UserApi.userFindAll);


module.exports = useRouter;
