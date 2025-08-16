import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from '../components/Navbar';
import { useTranslation } from 'react-i18next';

const Basket = () => {
    const API_URL = 'http://localhost:8080/api/basket';
    const { t } = useTranslation();
    const [basket, setBasket] = useState({ items: [] });
    const [total, setTotal] = useState(0);


    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const token = localStorage.getItem('token');
                const basketId = localStorage.getItem('basketId');
                const response = await axios.get(`${API_URL}/${basketId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBasket(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBasket();
    }, []);

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const token = localStorage.getItem('token');
                const basketId = localStorage.getItem('basketId');
                const response = await axios.get(`${API_URL}/total?basketId=${basketId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTotal(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBasket();
    }, [basket]);


    const handleAddItemQuantity = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            const basketId = localStorage.getItem('basketId');
            await axios.post(
                `${API_URL}/addQuantity?basketId=${basketId}&basketItemId=${itemId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const response = await axios.get(`${API_URL}/${basketId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBasket(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleDecrementItemQuantity = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            const basketId = localStorage.getItem('basketId');
            await axios.post(
                `${API_URL}/decrementQuantity?basketId=${basketId}&basketItemId=${itemId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const response = await axios.get(`${API_URL}/${basketId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBasket(response.data);
        } catch (error) {
            console.error(error);
        }
    };

        const handleDeleteItem = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            const basketId = localStorage.getItem('basketId');
            await axios.delete(
                `${API_URL}/deleteBasketItemFromBasket?basketId=${basketId}&basketItemId=${itemId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const response = await axios.get(`${API_URL}/${basketId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBasket(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
                <div className="card shadow-lg border-warning border-2 rounded-4 p-5 mt-5 w-100" style={{ maxWidth: 700 }}>
                    <span className="fs-1 d-inline-block" role="img" aria-label="basket">🧺</span>
                    <h1 className="fw-bold mb-4 text-warning">
                        Your Basket
                    </h1>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {basket.items && basket.items.length > 0 ? basket.items.map((item) => (
                            <div key={item.id} className="col">
                                <div className="card h-100 text-dark shadow-sm border-warning border-2 rounded-3 bg-light">
                                    <div className="card-body d-flex flex-column align-items-center">
                                        <span className="fs-2" role="img" aria-label="item">🥕</span>
                                        <h5 className="card-title mt-2 text-warning">
                                            {(item.productDTO && item.productDTO.productName) || (item.productDTO && item.productDTO.id) || 'Unknown Product'}
                                        </h5>
                                        <p className="card-text mb-1"><strong>Quantity:</strong> {item.quantity}</p>
                                        <button
                                            className="btn btn-warning mt-auto fw-semibold rounded-pill"
                                            onClick={() => handleAddItemQuantity(item.id)}
                                        >
                                            {t('basket.add') || 'Add'}
                                        </button>
                                        <button
                                            className="btn btn-warning mt-auto fw-semibold rounded-pill"
                                            onClick={() => handleDecrementItemQuantity(item.id)}
                                        >
                                            {t('basket.decrement') || 'Decrement'}
                                        </button>
                                        <button
                                            className="btn btn-warning mt-auto fw-semibold rounded-pill"
                                            onClick={() => handleDeleteItem(item.id)}
                                        >
                                            {t('basket.delete') || 'Delete'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="col">
                                <div className="alert alert-warning">
                                    {t('basket.empty') || "Your basket is empty!"}
                                </div>
                            </div>
                        )}
                    </div>
                        <div className="mt-3 fw-bold text-success">
                            Total: €{total}
                        </div>
                </div>
            </div>
        </>
    );
};
export default Basket;