import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Address from '../components/Address';
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Vendor from '../components/Vendor';

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
            <Address onClose={() => setOpen(false)} />
          </div>
        )}
      </div>


      <div className="py-4">
        <h2 className="fw-bold text-center mb-4">{t("vendor.allVendors")}</h2>
        <div className="g-4">
          <div className="col">
            <div className="card shadow-lg border-0">
              <Vendor />
            </div>
          </div>
        </div>
      </div>

       <div className="text-center py-3">
        <Link to="/ordination" className="nav-link" style={{ color: '#27ae60', fontWeight: 1000 }}>
          Food
        </Link>
      </div>
      <Footer />
    </>
  );
};
export default Home;