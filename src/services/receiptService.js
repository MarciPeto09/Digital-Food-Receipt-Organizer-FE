import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  },
});


export const uploadReceipt = async (receiptData) => {
  return await axios.post(`${BASE_URL}/upload`, receiptData, authHeader());
};

 
export const getAllReceipts = async () => {
  return await axios.get(BASE_URL, authHeader());
};

 
export const getReceiptById = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`, authHeader());
};

 
export const deleteReceipt = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}`, authHeader());
};

 
export const updateReceipt = async (id, updatedData) => {
  return await axios.put(`${BASE_URL}/${id}`, updatedData, authHeader());
};

 
export const searchReceipts = async (params) => {
  return await axios.get(`${BASE_URL}/search`, {
    ...authHeader(),
    params,
  });
};