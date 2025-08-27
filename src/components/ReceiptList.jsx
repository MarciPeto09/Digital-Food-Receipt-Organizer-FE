import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import axios from 'axios';
import jsPDF from 'jspdf';

const ReceiptList = ({ refreshTrigger }) => {
    const API_URL = 'http://localhost:8080/api/receipts';
    const { t } = useTranslation();
    const [receiptsList, setReceiptList] = useState([]);

    const fetchReceiptList = async () => {

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`${API_URL}/user/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setReceiptList(response.data);
    };

    useEffect(() => {
        fetchReceiptList();
    }, [refreshTrigger]);

    const formatDate = (d) => {
        if (Array.isArray(d)) {
            const [y, m, day, h, min, s, ns = 0] = d;
            return new Date(y, m - 1, day, h, min, s, Math.floor(ns / 1_000_000)).toLocaleString();
        }
        const date = new Date(d);
        return isNaN(date) ? 'Invalid date' : date.toLocaleString();
    };



    const handleDeleteReceipts = async (e, item) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`${API_URL}/${item.id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            fetchReceiptList();
        } catch (error) {
            console.error(error);
        }
    };

    const onButtonClick = async (item) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`${API_URL}/get?receiptId=${item.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const receipt = response.data;
            const doc = new jsPDF();
            let y = 38;
            doc.setFont('courier');
            doc.setFontSize(16);
            doc.text('Ricevuta di Acquisto', 105, 10, { align: 'center' });
            doc.setFontSize(12);
            doc.text(`ID Ricevuta: ${receipt.id}`, 10, 20);
            doc.text(`Data Acquisto: ${formatDate(receipt.purchaseDate)}`, 10, 27);
            if (receipt.deliveryAddress) {
                doc.text(`Indirizzo di consegna:`, 10, y);
                y += 7;
                const lines = doc.splitTextToSize(receipt.deliveryAddress, 180); 
                doc.text(lines, 10, y);
                y += lines.length * 7; 
            } else {
                y = 38; 
            }
            doc.line(10, y, 200, y);
            y += 5;
            doc.setFont(undefined, 'bold');
            doc.text('Q.ta', 10, y);
            doc.text('Prodotto', 30, y);
            doc.text('Prezzo', 160, y);
            doc.setFont(undefined, 'normal');
            y += 8;
            receipt.items?.forEach((prod) => {
                doc.text(`${prod.quantity}`, 10, y);
                doc.text(`${prod.itemName}`, 30, y);
                doc.text(`$${prod.unitPrice.toFixed(2)}`, 160, y, { align: 'right' });
                y += 8;
            });
            doc.line(10, y + 2, 200, y + 2);
            doc.setFont(undefined, 'bold');
            doc.text(`Totale: $${receipt.totalAmount.toFixed(2)}`, 160, y + 10, { align: 'right' });

            doc.save(`ricevuta-${receipt.id}.pdf`);
        } catch (error) {
            console.error('Errore nella generazione del PDF:', error);
        }
    };



    return (
        <div
            className="bg-white p-4 shadow rounded-4 mt-5 mx-auto container-sm"
            style={{
                maxWidth: 700,
            }}
        >
            <h2 className="mt-2 mb-1 text-dark">🧾 {t('receiptsItem.title') || 'Receipts Items'}</h2>
            <ul className="list-group">
                {receiptsList.map(items => (
                    <li className="list-group-item d-flex justify-content-between align-items-start small"
                        key={items.id}>
                        <div>
                            <div><strong>{t('receiptsItem.id')}:</strong> {items.id}</div>
                            <div><strong>{t('receiptsItem.total')}:</strong> ${items.total}</div>
                            <div>
                                <strong>{t('receiptsItem.purchasedate')}:</strong> {formatDate(items.purchaseDate)}
                            </div>
                        </div>
                        <div className="d-flex flex-row gap-2">
                            <button
                                className="btn btn-danger d-flex justify-content-between align-items-center fw-semibold rounded-pill px-2s py-1"
                                onClick={(e) => handleDeleteReceipts(e, items)}
                            >
                                {t('basket.delete') || 'Delete'}
                            </button>
                            <button
                                className="btn btn-info d-flex justify-content-between align-items-center fw-semibold rounded-pill px-2s py-1   "
                                onClick={() => onButtonClick(items)}
                            >
                                Download
                            </button>
                        </div>
                    </li>

                ))}
            </ul>
        </div>
    );


}; export default ReceiptList;