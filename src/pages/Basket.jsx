import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from '../components/Navbar';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

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
                console.log('Basket data:', response.data);
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
        <div className="min-vh-100 d-flex flex-column align-items-center justify-content-start bg-light py-5">
            <div className="card shadow-lg border-warning border-2 rounded-4 p-5 w-100" style={{ maxWidth: 700 }}>
                <div className="text-center mb-4">
                    <span className="fs-1 d-inline-block" role="img" aria-label="basket">🧺</span>
                    <h1 className="fw-bold text-warning">Your Basket</h1>
                    <h6 className="fst-italic text-dark">{basket.user?.deliveryAddress}</h6>
                </div>

                {basket.items && basket.items.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {basket.items.map((item) => (
                            <li
                                key={item.id}
                                className="list-group-item bg-white mb-3 rounded border-start border-4 border-warning shadow-sm"
                            >
                                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                                    <div className="d-flex align-items-center gap-3">
                                        <span className="fs-3" role="img" aria-label="item">🥕</span>
                                        <div>
                                            <h5 className="mb-1 text-warning">
                                                {(item.productDTO?.productName || item.productDTO?.id || 'Unknown Product')}
                                            </h5>
                                            <p className="mb-1">Price: €{(item.productDTO?.unitPrice ?? 0).toFixed(2)}</p>
                                            <p className="mb-1">Item Total: €{((item.quantity ?? 0) * (item.productDTO?.unitPrice ?? 0)).toFixed(2)}</p>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-wrap gap-2 align-items-center justify-content-end">
                                        <p className="mb-0"><strong>Qty:</strong> {item.quantity}</p>
                                        <button
                                            className="btn btn-sm btn-warning fw-semibold rounded-pill"
                                            onClick={() => handleAddItemQuantity(item.id)}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-warning fw-semibold rounded-pill"
                                            onClick={() => handleDecrementItemQuantity(item.id)}
                                        >
                                            -
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger fw-semibold rounded-pill"
                                            onClick={() => handleDeleteItem(item.id)}
                                        >
                                            {t('basket.delete') || 'Delete'}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="alert alert-warning text-center">
                        {t('basket.empty') || "Your basket is empty!"}
                    </div>
                )}

                <div className="mt-4 text-end fs-5 fw-bold text-success">
                    Total: €{(total ?? 0).toFixed(2)}   
                </div>
            </div>
        </div>
        <Footer />
    </>
);

};
export default Basket;