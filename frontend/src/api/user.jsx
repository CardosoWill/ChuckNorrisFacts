import api from './api'

export const createUser = async (user) => {
    const response = await api.post('/api/v1/create', user)
    console.log(response.data)
    return response.data
}

export const verificaCode = async (user) => {
    const response = await api.post('/api/v1/valid', user)
    console.log(response.data)
    return response.data
}

export const updateUser = async (user) => {
    const response = await api.put('/api/v1/user', user)
    return response.data
}

export const deleteUser = async () => {
    return api.delete('/api/v1/user')
}

export const getUserById = async (id) => {
    const response = await api.get(`/api/v1/user/${id}`)
    return response.data
}

export const getUsers = async () => {
    const response = await api.get('/api/v1/user')
    return response.data
}

export const loginUser = async (email, password) => {
    const body = { email, password }
    const response = await api.post('/api/v1/login', body, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data
}
