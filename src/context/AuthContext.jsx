import { createContext, useEffect, useState } from 'react';
import { getToken, logout as performLogout } from '../services/authService';
import * as jwtDecode from 'jwt-decode';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user,setUser] = useState("");

    useEffect(() =>{
        const token = getToken();
        if(token){
            try{
                const decoded = jwtDecode.default(token);
                setUser(decoded);
            }catch(error){
                performLogout();
                setUser(null);
            }
        }
    }, []);

    const logout = () => {
        performLogout();
        setUser(null);
    }

    return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
    
};