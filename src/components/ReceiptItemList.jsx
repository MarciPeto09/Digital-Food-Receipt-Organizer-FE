import { useEffect,useState  } from "react";
import { useTranslation } from 'react-i18next';


const ReceiptItemsList = (receiptId ) => {
    const API_BASE_URL = 'http://localhost:8080/items';
    const { t } = useTranslation();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async ()  => {
            const data = await getItemsByReceipt(receiptId);
            setItems(data);
        };
        fetchItems();
    }, [receiptId]);


    retrun (
        <>
        <h2>Receipts Items:</h2>
        <ul>
            {items.map(items => (
                <li key={items.id}>{items.name} {t('receiptsItem.quantity')}: {items.quantity}</li>
            ))}
        </ul>
        </>
    )
};  export default ReceiptItemsList;