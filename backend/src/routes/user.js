const express = require('express');
const UserApi = require('../api/user')

const useRouter = express.Router();

useRouter.get('/', UserApi.findUser);
useRouter.post('/', UserApi.createUser);
useRouter.put('/:id', UserApi.updateUser);
useRouter.delete('/:id', UserApi.deleteUser);

module.exports = useRouter;