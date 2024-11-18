import api from './api'

export const createUser = async (user) => {
    const response = await api.post('/api/v1/create', user)
    return response.data
}

export const deleteUser = async () => {
    return api.delete('/api/v1/user/')
}

export const loginUser = async (email, password) => {
    const body = { email, password }
    const response = await api.post('/api/v1/login', body, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data
}
export const getContext = async() => {
    const response = await api.get('/api/v1/user/context') 
    return response.data
}
export const updateUser = async (user) => {
    const response = await api.put('/api/v1/user/', user);
    return response.data;
  };