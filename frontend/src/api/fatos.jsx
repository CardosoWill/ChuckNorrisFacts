import api from './api'

export const createJoke = async (piada) => {
    const response = await api.post('/api/v1/jokes', piada)
    return response.data
}

export const getContext = async() => {
    const response = await api.get('/api/v1/jokes/random')
    console.log(response) 
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
export const updateUser = async(user) => {
    const response = await api.put('/api/v1/user/',user) 
    return response.data
}