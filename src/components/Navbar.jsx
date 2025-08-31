import { useTranslation } from 'react-i18next';
import SearchBar from "./SearchBar";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LanguageSelector from './LanguageSelector ';
import { getUserById } from '../services/userService';

const NavBar = () => {
  const { t } = useTranslation();
  const [userId, setUserId] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storeId = localStorage.getItem("userId");
    if (storeId) {
      setUserId(storeId);
    }
  }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const isAdmin = () => {
    return localStorage.getItem("userRole") === "ROLE_ADMIN";
  };

  useEffect(() => {
  const fetchUser = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await getUserById(userId);                     
      setPhoto(response.data.photo);              
    } catch (error) {
      console.error("Errore nel fetch user:", error);
    }
  };

  fetchUser();
}, []);


  return (
    <nav className="navbar navbar-light bg-light px-3 py-2 shadow-sm">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
          <button
            className="btn btn-outline-secondary"
            onClick={toggleOpen}
            aria-label="Toggle menu"
          >
            <i className="bi bi-list" style={{ fontSize: '1.5rem' }}></i>
          </button>

          <div className="d-flex justify-content-center mx-3 gap-3">
            <div style={{ width: "400px" }}>
              <SearchBar />
            </div>
            <LanguageSelector />
            <Link to={`/profile/${userId}`} className="nav-link ms-2"><img
              src={`http://localhost:8080/uploads/${photo}`}
              className="rounded-circle shadow"
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'cover',
                border: '4px solid #ffb347',
                background: '#fffbe6'
              }}
              alt="profile"
            /></Link>

             <Link to="/basket" className="nav-link ms-2">
              <i className="bi bi-cart" style={{ fontSize: '1.5rem',color: '#d35400' }}></i>
            </Link>
          </div>
        </div>

        {isOpen && (
          <div
            className="navbar-nav position-absolute top-100 start-0 mt-2 p-3 shadow rounded-3"
            style={{ background: '#fffbe6', zIndex: 1050 }}
          >
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/ordination" className="nav-link">{t('nav.ordination')}</Link>
            <Link to="/receipts" className="nav-link">Receipt Detail</Link>
            <Link to="/dashboard" className="nav-link">{t('nav.dashboard')}</Link>
            <Link to="/analytics" className="nav-link">{t('nav.analytics')}</Link>
            {isAdmin() && (
              <>
                <Link to="/register" className="nav-link">{t('nav.register')}</Link>
                <Link to="/registerVendor" className="nav-link">{t('nav.registerVendor')}</Link>
              </>
            )}
          </div>
        )}

      </div>
    </nav>
  );

}; export default NavBar;