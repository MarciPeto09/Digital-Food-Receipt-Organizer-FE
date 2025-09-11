import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ReceiptDetail from './pages/ReceiptDetail';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import RegistrationUser from './pages/RegistrationUser';
import Profile from './pages/Profile';
import ModificaProfile from './pages/ModificaProfile';
import Ordination from './pages/Ordiation';
import Basket from './pages/Basket';
import Chat from './components/Chat';
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Vendor from './components/Vendor';
import RegistrationVendor from './pages/RegistrationVendor';
import VendorProductOrdination from './pages/VendorProductOrdination';
import Address from './components/Address';
import ProductsXCategory from './pages/ProductsXCategory';
import axios from "axios";
import ProductDetail from './pages/detailPages/ProductDetail';
import ReceiptItemDetail from './pages/detailPages/ReceiptItemDetail';
import UserDetail from './pages/detailPages/UserDetail';
import VendorDetail from './pages/detailPages/VendorDetail';

function AppContent() {
  const [showChat, setShowChat] = useState(false);
  const location = useLocation();
  const hideChatPaths = ["/"];
  const shouldHideChat = hideChatPaths.includes(location.pathname);

  //chat variable
  const [unSeenCount, setUnSeenCount] = useState({});
  const API_URL = "http://localhost:8080/api";
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to load users', err);
      }
    };
    if (token) {
      fetchUsers();
    }
  }, [token]);


  useEffect(() => {
    const fetchUnseenCounts = async () => {
      try {
        const promises = users
          .filter((user) => user.id !== Number(userId))
          .map(async (u) => {
            try {
              const res = await axios.get(`${API_URL}/message/countUnseenMessagesPerSender`, {
                params: { senderId: u.id, receiverId: userId },
                headers: { Authorization: `Bearer ${token}` },
              });
              return { userId: u.id, count: res.data };
            } catch (err) {
              console.error(`Failed to fetch unseen count for user ${u.id}`, err);
              return { userId: u.id, count: 0 };
            }
          });

        const results = await Promise.all(promises);
        const counts = results.reduce((acc, { userId, count }) => {
          acc[userId] = count;
          return acc;
        }, {});
        setUnSeenCount(counts);
      } catch (err) {
        console.error('Failed to fetch unseen counts', err);
      }
    }

    if (token && userId && users.length > 0) {
      fetchUnseenCounts();
      const interval = setInterval(fetchUnseenCounts, 5000);
      return () => clearInterval(interval);
    }
  }, [userId, token, users]);

  const updateUnseenCounts = async () => {
    try {
      const promises = users
        .filter((user) => user.id !== Number(userId))
        .map(async (u) => {
          try {
            const res = await axios.get(`${API_URL}/message/countUnseenMessagesPerSender`, {
              params: { senderId: u.id, receiverId: userId },
              headers: { Authorization: `Bearer ${token}` },
            });
            return { userId: u.id, count: res.data };
          } catch (err) {
            console.error(`Failed to fetch unseen count for user ${u.id}`, err);
            return { userId: u.id, count: 0 };
          }
        });

      const results = await Promise.all(promises);
      const counts = results.reduce((acc, { userId, count }) => {
        acc[userId] = count;
        return acc;
      }, {});
      setUnSeenCount(counts);
    } catch (err) {
      console.error('Failed to fetch unseen counts', err);
    }
  };


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegistrationUser />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/receipts" element={<ReceiptDetail />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/modificaProfile/:id" element={<ModificaProfile />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/ordination" element={<Ordination />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/registerVendor" element={<RegistrationVendor />} />
        <Route path="/address" element={<Address />} />
        <Route path="/productsXCategory/:itemCategory" element={<ProductsXCategory />} />
        <Route path="/vendorProductOrdination/:vendorId" element={<VendorProductOrdination />} />
        <Route path="/vendors/vendorById/:vendorId" element={<VendorDetail />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/receipts/:id" element={<ReceiptDetail />} />
        <Route path="/receipt-items/:id" element={<ReceiptItemDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!shouldHideChat && (
        <>
          <button
            onClick={() => setShowChat(prev => !prev)}
            className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center position-fixed end-0 translate-middle shadow-sm"
            style={{ width: '56px', height: '56px', zIndex: 1050, top: '80%' }}
            aria-label="Chat"
          >
            <i className="bi bi-chat-dots" style={{ fontSize: '1.5rem', color: '#555' }}></i>
            {Object.values(unSeenCount).reduce((a, b) => a + b, 0) > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {Object.values(unSeenCount).reduce((a, b) => a + b, 0)}
              </span>
            )}
          </button>
          {showChat && (
            <div
              className="position-fixed bottom-0 end-0 m-4 border bg-white shadow d-flex flex-column"
              style={{ width: "550px", height: "500px", zIndex: 1051, borderRadius: "20px", }}
            >
              <Chat onClose={() => setShowChat(false)} unSeenCount={unSeenCount} updateUnseenCounts={updateUnseenCounts} /></div>
          )}
        </>
      )}
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};
export default App
