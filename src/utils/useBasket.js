import { useState } from "react";
import axios from "axios";
import '../App.css';


export function useBasket() {
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (itemId, value) => {
        const parsed = parseInt(value, 10);
        setQuantities(prev => ({
            ...prev,
            [itemId]: isNaN(parsed) || parsed < 1 ? 1 : parsed
        }));
    };


    const handleAddBasketItemToBasket = async (e, item) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const basketId = localStorage.getItem('basketId');

        if (!token || !basketId) {
            alert("You are not authenticated or basketId is missing. Please login again.");
            return;
        }

        const productId = item.id;
        const itemQuantity = quantities[item.id] || 1;

        if (itemQuantity <= 0) {
            alert("Quantity must be at least 1");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:8080/api/basket/addBasketItemToBasket/${basketId}`,
                null,
                {
                    params: {
                        productId,
                        itemQuantity
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            console.log(response.data);

        } catch (error) {
            console.error(error);
            alert("Error adding item to basket: " + (error.response?.data?.message || error.message));
        }
    };
    return {
    quantities,
    handleQuantityChange,
    handleAddBasketItemToBasket
  };
}