import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";


const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const [quantities, setQuantities] = useState({});
    const API_URL = 'http://localhost:8080/api/products';

    const handleQuantityChange = (productId, value) => {
        const parsed = parseInt(value, 10);
        setQuantities(prev => ({
            ...prev,
            [productId]: isNaN(parsed) || parsed < 1 ? 1 : parsed
        }));
    };



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/${productId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setProduct(response.data);
                setLoading(false)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }

        };
        if (productId) {
            fetchProducts();
        }
    }, [productId]);

    const handleAddBasketItemToBasket = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const basketId = localStorage.getItem('basketId');

        if (!token || !basketId) {
            alert("You are not authenticated or basketId is missing. Please login again.");
            return;
        }

        const itemQuantity = quantities[productId] || 1;

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


    return (
        <>
            <NavBar />
            <div>
                <div className="conteiner d-flex justify-content-center mt-5">
                    {loading && <p>Loading...</p>}
                    {!loading && !product && <p>No product found</p>}
                    {!loading && product && (
                        <div className="card h-100 w-50 shadow-lg border-0 rounded-4 p-4 text-dark text-start product-card">
                            <h5 className="card-title mb-3">{product.productName}</h5>
                            <p className=" "><strong>{t('products.quantity')}:</strong> {product.quantity}</p>
                            <p className=" "><strong>{t('products.unitPrice')}:</strong> {product.unitPrice?.toFixed(2)}</p>
                            <p className=" "><strong>{t('products.category')}:</strong> {product.category?.name || 'Uncategorized'}</p>
                            <div className="d-flex justify-content-end align-items-end mt-3 gap-3">
                                <button className="btn btn-primary" onClick={(e) => handleAddBasketItemToBasket(e, item)}>{t ? t('items.add') : 'Add'}</button>
                                <input
                                type="number"
                                min={1}
                                value={quantities[product.id] || 1} 
                                onChange={e => handleQuantityChange(product.id, e.target.value)}
                                style={{ width: 60, marginLeft: 8 }}
                            />
                        </div>
                    </div>
                )}</div>
            </div>
            <Footer />
        </>
    );

}; export default ProductDetail;