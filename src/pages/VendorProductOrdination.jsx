import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import '../App.css';
import NavBar from '../components/Navbar';
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import VendorProductListComponent from "../components/VendorProductListComponent";


const VendorProductOrdination = () => {
  const API_URL = 'http://localhost:8080/api/vendors';
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { vendorId } = useParams();



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

  return (
    <>
      <NavBar />
      <div className="background">
        <div className="content">
          <VendorProductListComponent vendorId={vendorId} />
        </div></div>
      <Footer />
    </>
  );
}; export default VendorProductOrdination;