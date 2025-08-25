import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials, {
        headers: {
          'Content-Type': 'application/json', 
        },
        withCredentials: true, 
      }
    );

        const { token, user } = response.data;

        if (token) {
            localStorage.setItem('token', token);
        }
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }

        return { token, user };
    } catch (error) {
        console.error('Login failed', error.response);
        throw error.response?.data || { message: 'Login failed' };
    }
};



export const register = async (userData) => {
    const token = localStorage.getItem("token");
    try{
        const response = await axios.post(`${API_URL}/register`,userData, {
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
    });
        return response.data;
    }catch(error){
        console.error("Registration failed: ", error);   
        throw error.response?.data || { message: 'Registration failed. Please try again.' }; 
    }
};




export const logout = () => {
    localStorage.removeItem('token');
}

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isLoggedIn = () => {
  return !!getToken();
};