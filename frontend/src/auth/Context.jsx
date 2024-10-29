import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'

const isValidToken = (token) => {
    try {
        const decode = jwtDecode(token);
        const currentTime = Data.now() / 1000
        return decode.exp > currentTime     
    } catch (error) {
        return false
    }

}

const getRole = (token) => {
    try {
        const decode = jwtDecode(token);
        return decode.permissao        
    } catch (error) {
        return false
    }
}
export const authContext = createContext()

export const AuthProvider = ({children}) => {7
    const [ token, setToken ] = useState(null)
    const [ role, setRole ] = useState(null)
    
    useEffect(() => {
        const storedToken  = localStorage.getItem('token')
        if(storedToken  && isValidToken(storedToken )){
            setToken(storedToken );
            setRole(getRole(storedToken ));
        } else {
            setToken(null)
            setRole(null)
            localStorage.removeItem('token')
        }
    }, [])
    
    const login = (newToken) => {
        setToken(newToken)
        setRole(getRole(newToken))
        localStorage.setItem('token', newToken)
    }
    const logout = () => {
        setToken(null);
        setRole(null); 
        localStorage.removeItem('token');
    }
    


    return(
        <authContext.Provider value={{ token, login, logout, role }}>
        {children}
        </authContext.Provider>
    );
};