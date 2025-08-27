import { useTranslation } from 'react-i18next';
import SearchBar from "./SearchBar";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LanguageSelector from './LanguageSelector ';

const NavBar = () => {
  const { t } = useTranslation();
  const [userId, setUserId] = useState("");
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

  return (
    <nav className="navbar navbar-light bg-light px-3 py-2 shadow-sm">
      <div className="container-fluid">
        {/* Top bar */}
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
            <Link to={`/profile/${userId}`} className="nav-link">{t('nav.profile')}</Link>
            <Link to="/basket" className="nav-link">
              <i className="bi bi-cart" style={{ fontSize: '1.5rem' }}></i>
            </Link>
          </div>
        )}

      </div>
    </nav>
  );

}; export default NavBar;