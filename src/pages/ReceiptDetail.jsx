import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import { useTranslation } from 'react-i18next';
import ReceiptList from "../components/ReceiptList";
import Footer from '../components/Footer';

const ReceiptDetail = () => {
    const API_URL = 'http://localhost:8080/api/receipts';
    const { t } = useTranslation();
    const [receipt, setReceipt] = useState({});
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const fetchReceipt = async () => {
    try {
        const token = localStorage.getItem('token');
        const basketId = localStorage.getItem("basketId");

        const response = await axios.post(`${API_URL}/from-basket/${basketId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Receipt Data:", response.data);
        setReceipt(response.data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchReceipt();
}, []);

    const items = Array.isArray(receipt.items) ? receipt.items : [];

    const handleSaveReceipts = async () => {
        try {
            const token = localStorage.getItem('token');
            const basketId = localStorage.getItem('basketId');
            await axios.post(
                `${API_URL}/saveReceipt/${basketId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setReceipt({ items: [], totalAmount: 0 });
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="min-vh-100 py-5 d-flex flex-column align-items-center"
                style={{
                    background: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80") center/cover no-repeat'
                }}>
                <span className="fw-bold" style={{ color: "#d35400", fontSize: "1.5rem" }}>Loading...</span>
            </div>
        );
    }

    return (
        <>
            <NavBar />
            <div
                className="min-vh-100 py-5 d-flex flex-column align-items-center"
                style={{
                    overflowY: 'auto',
                    background: 'url("https://img.computing.es/wp-content/uploads/2025/04/02163504/Gatronomia.jpg") center/cover no-repeat fixed'
                }}
            >
                <div
                    className="bg-white p-4 shadow rounded-4"
                    style={{
                        width: '100%',
                        maxWidth: 700,
                        fontFamily: `'Courier New', Courier, monospace`,
                        border: '1px dashed #999',
                        background: '#fefefe'
                    }}
                >
                    <div className="text-center border-bottom pb-3 mb-3">
                        <span style={{ fontSize: '2.5rem' }} role="img" aria-label="receipt">🧾</span>
                        <h4 className="mt-2 mb-1" style={{ color: '#333' }}>
                            Receipt
                        </h4>
                        <small className="text-muted">
                            Purchased on: {new Date().toLocaleString()}
                        </small>
                    </div>

                    <div className="d-flex justify-content-between mb-3 px-2">
                        <div><strong>Vendor:</strong> {receipt.vendor?.name || 'Unknown'}</div>
                        <div><strong>Total:</strong> ${receipt.totalAmount?.toFixed(2)}</div>
                    </div>

                    <hr style={{ borderTop: '1px dotted #aaa' }} />

                    <div className="mb-3">
                        <h5 className="text-center mb-3" style={{ color: '#555' }}>🛒 Item List</h5>
                        {receipt.items?.map((item, index) => (
                            <div key={index} className="d-flex justify-content-between align-items-start border-bottom py-2 px-2">
                                <div>
                                    <div><strong>{item.itemName}</strong></div>
                                    <div style={{ fontSize: '0.85rem' }}>
                                        Qty: {item.quantity} | ${item.unitPrice?.toFixed(2)} each
                                    </div>
                                </div>
                                <div className="text-end" style={{ whiteSpace: 'nowrap' }}>
                                    <div><strong>${(item.quantity * item.unitPrice).toFixed(2)}</strong></div>
                                    <div style={{ fontSize: '0.75rem', color: '#888' }}>
                                        {item.category?.name || 'Uncategorized'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mr-3 ms-1">
                    <strong>Address:</strong> {receipt.deliveryAddress} 
                    </div>
                    <div className="border-top pt-3 px-2 d-flex justify-content-between fw-bold fs-5">
                        <div>Total Paid:</div>
                        <div>${receipt.totalAmount?.toFixed(2)}</div>
                    </div>

                    <div className="d-flex justify-content-center mt-4">
                        <button
                            className="btn btn-success d-flex justify-content-between align-items-center fw-semibold rounded-pill px-4 py-2"
                            onClick={() => handleSaveReceipts()}
                        >
                            {t('basket.save') || 'Purchase'}
                        </button>
                    </div>

                    <div className="text-center mt-4 text-muted" style={{ fontSize: '0.85rem' }}>
                        Thank you for your purchase!
                    </div>
                </div>
                <div className="mb-5 w-100 px-3">
                <ReceiptList refreshTrigger={refreshTrigger} />
                </div>
            </div>
            <Footer />
        </>

    );
};


export default ReceiptDetail;