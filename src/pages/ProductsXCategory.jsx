import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { useBasket } from '../utils/useBasket';


const ProductsXCategory = () => {
  const API_URL = 'http://localhost:8080/api/products';
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const { itemCategory } = useParams();

  const {
    quantities,
    handleQuantityChange,
    handleAddBasketItemToBasket
  } = useBasket();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/productsXCategory/${itemCategory}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);

      } catch (error) {
        console.log(error);
      }

    }
    fetchProducts();
  }, [itemCategory]);


  return (
    <>
      <NavBar />
      <div className="container">
        <h2>{t('category.category')} - {itemCategory}</h2>
        <div className="row">
          {products.map((item) => (
            <div key={item.id || item.itemName} className="col-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.productName}</h5>
                  <p className="card-text"><strong>{t('products.quantity')}</strong> {item.quantity}</p>
                  <p className="card-text"><strong>{t('products.unitPrice')}</strong> {item.unitPrice?.toFixed(2)}</p>
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
      <Footer />
    </>
  );

}; export default ProductsXCategory;