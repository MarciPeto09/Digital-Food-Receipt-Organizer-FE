import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ReceiptItemDetail = () => {
    const { itemId } = useParams();
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const API_URL = 'http://localhost:8080/api/receipts';


    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/getReceiptThatContainReceiptItem/${itemId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setReceipts(response.data);
                setLoading(false)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }

        };
        if (itemId) {
            fetchReceipts();
        }
    }, [itemId]);

    return (
        <>
            <NavBar />
                <div className="background min-vh-100 d-flex align-items-center justify-content-center bg-light">
                    <div className="card shadow-lg border-0 rounded-4 p-5 my-5 w-100" style={{ maxWidth: 700 }}>
                        <div className="text-center mb-4">
                            <span style={{ fontSize: '2.2rem' }} role="img" aria-label="receipt">🧾</span>
                            <h2 className="fw-bold mb-0" style={{ color: '#d35400' }}>
                                {t('receipt.title') || "Receipt"}
                            </h2>
                        </div>
                        {loading && <p className="text-center text-secondary">Loading...</p>}
                        {!loading && receipts.length === 0 && (
                            <div className="alert alert-warning text-center">
                                {t('receipt.noFound') || "No receipts found"}
                            </div>
                        )}
                        {!loading && receipts.length > 0 && receipts.map((item) => (
                            <div key={item.id} className="mb-4 p-3 rounded-3 border border-warning bg-light">
                                <p className="mb-1"><strong>{t('receipt.id') || "Receipt ID"}:</strong> {item.id}</p>
                                <p className="mb-1"><strong>{t('receipt.date') || "Purchase Date"}:</strong> {item.purchaseDate}</p>
                                <p className="mb-1"><strong>{t('receipt.address') || "Address"}:</strong> {item.deliveryAddress}</p>
                                <p className="mb-1"><strong>{t('receipt.vendor') || "Vendor"}:</strong> {item.vendor}</p>
                                {item.items && item.items.length > 0 && (
                                    <div className="mb-2">
                                        <strong>Items:</strong>
                                        <ul className="mb-1">
                                            {item.items.map((receiptItem) => (
                                                <li key={receiptItem.id}>
                                                    <span role="img" aria-label="item"></span> {receiptItem.itemName}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <p className="mb-0"><strong>{t('receipt.total') || "Total Amount"}:</strong> <span className="text-success">{item.totalAmount}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            <Footer />
        </>
    );

}; export default ReceiptItemDetail;