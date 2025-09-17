import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import VendorProductListComponent from "../../components/VendorProductListComponent";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";

const VendorDetail = () => {
    const { vendorId } = useParams();
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const [items, setItems] = useState([]);
    const [quantities, setQuantities] = useState({});
    const API_URL = 'http://localhost:8080/api/vendors';

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/vendorById/${vendorId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setVendor(response.data);
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        };
        fetchVendors();
    }, [vendorId]);



    const handleQuantityChange = (itemId, value) => {
        const parsed = parseInt(value, 10);
        setQuantities(prev => ({
            ...prev,
            [itemId]: isNaN(parsed) || parsed < 1 ? 1 : parsed
        }));
    };


    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_URL}/${vendorId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setItems(response.data);
            } catch (error) {
                console.log(error);
            }

        }
        fetchItems();
    }, []);


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

    if (loading) return <p>Loading...</p>;
    if (!vendor) return <p>Vendor not found</p>;

    return (
        <>
            <NavBar />
            <div className="background min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
                <div className="card shadow-lg border-0 rounded-4 p-4 my-5 w-100" style={{ maxWidth: 600 }}>
                    <div className="text-center mb-3">
                    </div>
                    <h2 className="fw-bold mb-1" style={{ color: '#d35400' }}>{vendor.name}</h2>
                    <p className="mb-2 text-secondary">{vendor.location}</p>
                    <hr />
                </div>
            </div>
            <Footer />
        </>
    );

};

export default VendorDetail;
