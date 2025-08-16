import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export const registerUser = async (request) => {
    const respose = await axios.post('API_URL/register');
    return respose.data;
}; 

export const getUserById = async (userId) => {
    const response = await axios.get('API_URL/${userId}');
    return response.data;   
};

export const getUserReceipts = async (userId) => {
    const response = await axios.get('API_URL/${userId}/receipts');
    return response.data;  
};

export const getUserTotalSpending = async (userId) => {
   const response = await axios.get('API_URL/${userId}/total-spending');
    return response.data; 
};