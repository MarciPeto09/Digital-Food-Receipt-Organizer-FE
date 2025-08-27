import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Address from '../components/Address';
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Home = () => {

  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);

  const toggleAddress = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <NavBar />
      <div className=' p-3'>
        <button onClick={toggleAddress} className="btn btn-light border">
          {t('address.address')}
        </button>
       {isOpen && (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        background: "rgba(0,0,0,0.5)",  
        zIndex: 1051
      }}
    >
      <Address onClose={() => setOpen(false)}/>
    </div>
  )}
      </div>
      <div
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div
          className="card shadow-lg border-0 rounded-4 p-5"
          style={{
            background: 'linear-gradient(135deg, #fffbe6 0%, #ffe5b4 100%)',
            border: '2px solid #ffb347',
            maxWidth: 500,
            width: '100%',
            textAlign: 'center'
          }}
        >
          <Link to="/vendor" className="nav-link" style={{ color: '#27ae60', fontWeight: 1000 }}>Vendor</Link>
        </div>


        <div
          className="card shadow-lg border-0 rounded-4 p-5 mt-5"
          style={{
            background: 'linear-gradient(135deg, #fffbe6 0%, #ffe5b4 100%)',
            border: '2px solid #ffb347',
            maxWidth: 500,
            width: '100%',
            height: '100%',
            textAlign: 'center'
          }}
        >
          <Link to="/ordination" className="nav-link" style={{ color: '#27ae60', fontWeight: 1000 }}>Food</Link>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Home;