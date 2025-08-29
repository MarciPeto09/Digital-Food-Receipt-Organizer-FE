import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import '../App.css';
import NavBar from '../components/Navbar';
import { useBasket } from '../utils/useBasket';

const Ordination = () => {
  const API_URL = 'http://localhost:8080/api/products';
  const { t } = useTranslation();
  const [items, setItems] = useState([]);

   const {
      quantities,
      handleQuantityChange,
      handleAddBasketItemToBasket
    } = useBasket();
  

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}`, {
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


  return (
    <>
      <NavBar />
      <div className="background">
        <div className="content">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {items.map((item) => (
              <div key={item.id || item.itemName} className="col">
                <div className="card h-100 text-dark">
                  <div className="card-body">
                    <h5 className="card-title">{item.productName}</h5>
                    <p className="card-text"><strong>Quantity:</strong> {item.quantity}</p>
                    <p className="card-text"><strong>Unit Price:</strong> {item.unitPrice?.toFixed(2)}</p>
                    <p className="card-text"><strong>Category:</strong> {item.category?.name || 'Uncategorized'}</p>
                    <button className="btn btn-primary" onClick={(e) => handleAddBasketItemToBasket(e, item)}>{t ? t('items.add') : 'Add'}</button>
                    <input
                      type="number"
                      min={1}
                      value={quantities[item.id] || 1}
                      onChange={e => handleQuantityChange(item.id, e.target.value)}
                      style={{ width: 60, marginLeft: 8 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Ordination;