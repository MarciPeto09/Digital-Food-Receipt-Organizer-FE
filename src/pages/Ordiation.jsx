import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import '../App.css';
import NavBar from '../components/Navbar';

const Ordination = () => {
  const API_URL = 'http://localhost:8080/api/products';
  const { t } = useTranslation();

  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});

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

    alert("Item added to basket successfully!");
    console.log(response.data);

  } catch (error) {
    console.error(error);
    alert("Error adding item to basket: " + (error.response?.data?.message || error.message));
  }
};

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