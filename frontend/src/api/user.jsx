import api from './api'

export const createUser = async (user) => {
    const response = await api.post('/api/v1/create', user)
    return response.data
}

export const deleteUser = async () => {
    return api.delete('/api/v1/user/')
}

export const deleteAdmin = async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token de autenticação não encontrado.");
    }

    return api.delete(`/api/v1/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

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

  export const updateAdmin = async (id, {nome,email}) => {
    console.log(id, {nome,email})
      const response = await api.put(`/api/v1/user/${id}`, {nome,email})
        return response.data;
  };

export const getUserById = async (id) => {
    const response = await api.get(`/api/v1/user/${id}`);
    return response.data;
};
export const getAllUsers = async () => {
    const response = await api.get(`/api/v1/user`);
    return response.data;
};
