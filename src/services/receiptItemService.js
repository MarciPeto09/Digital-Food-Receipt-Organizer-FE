import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/items';

export const addItemToReceipt  = async(receiptId, itemDto) =>{
    const response = await axios.post('API_BASE_URL/receipt/${receiptId}',itemDto);
    return response.data;
};

export const getItemsByReceipt = async(receiptId) =>{
    const response = await axios.get('API_BASE_URL/receipt/${receiptId}');
    return response.data;
}


export const updateItem = async(itemId,itemDTO) =>{
    const response = await axios.put('API_BASE_URL/${itemId}',itemDTO);
    return response.data;
}

export const deleteItem = async(itemId) => {
    const response = await axios.delete('API_BASE_UR/${itemId}');
    return response.data;
}

export const calculateTotalForItem = async(itemId) => {
    const response = await axios.get('API_BASE_UR/${itemId}/total');
    return response.data;
}

export const calculateTotalForReceipt = async(receiptId) => {
    const response = await axios.get('API_BASE_UR/receipt/${itemId}/total');
    return response.data;
}