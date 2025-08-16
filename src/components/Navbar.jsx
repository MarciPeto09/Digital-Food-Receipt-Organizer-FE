import { useTranslation } from 'react-i18next';
import SearchBar from "./SearchBar";
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';

const NavBar =() => {
    const { t } = useTranslation();
    const [userId,setUserId] = useState("");

    useEffect(() => {
      const storeId = localStorage.getItem("userId");
      if(storeId){
        setUserId(storeId);
      }
    },[userId]);

return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <button 
      className="navbar-toggler" 
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#navbarNav" 
      aria-controls="navbarNav" 
      aria-expanded="false" 
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav w-100 d-flex justify-content-between">
        <Link to="/home" className="nav-item nav-link mx-3">Home</Link>
        <Link to="/ordination" className="nav-item nav-link mx-3">{t('nav.ordination')}</Link>
        <Link  to="/receipts" className="nav-item nav-link mx-3">Receipt Detail</Link >
        <Link  to="/dashboard" className="nav-item nav-link mx-3">{t('nav.dashboard')}</Link >
        <Link  to="/analytics" className="nav-item nav-link mx-3">{t('nav.analytics')}</Link >
        <Link  to={`/profile/${userId}`} className="nav-item nav-link mx-3">{t('nav.profile')}</Link >
        <Link  to="/" className="nav-item nav-link mx-3">{t('nav.logout')}</Link >
        <Link  to="/basket" className="nav-item nav-link mx-3"><i className="bi bi-cart" style={{ fontSize: '1.5rem' }}></i></Link >
        <div className="nav-item nav-link mx-2"><SearchBar /></div>
    </div>
    </div>
    </div>
    </nav>
);
}; export default NavBar;