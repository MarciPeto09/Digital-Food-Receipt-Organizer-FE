import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export const createVendor = async (vendorDTO) =>{
 const response = await axios.post('API_URL',vendorDTO);
 return response.data;
};

export const getVendorById = async (vendorId) => {
 const response = await axios.get('API_URL/${vendorId}');
 return response.data;
};

export const getAllVendors = async () => {
 const response = await axios.get('API_URL');
 return response.data;
};

export const updateVendor = async (vendorDTO) => {
 const response = await axios.put('API_URL',vendorDTO);
 return response.data;
};

export const deleteVendor = async (vendorId) =>{
    const response = await axios.delete('API_URL/${vendorId}');
    return response.data;
};