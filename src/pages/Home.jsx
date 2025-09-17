import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Address from '../components/Address';
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Vendor from '../components/Vendor';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Home = () => {

  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

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

  const categories = [
    { key: 'MEAT', label: t('category.meat') },
    { key: 'FISH', label: t('category.fish') },
    { key: 'EGGS', label: t('category.eggs') },
    { key: 'DAIRY', label: t('category.dairy') },
    { key: 'GRAINS', label: t('category.grains') },
    { key: 'VEGETABLES', label: t('category.vegetables') },
    { key: 'FRUIT', label: t('category.fruit') },
    { key: 'OIL', label: t('category.oil') },
    { key: 'SWEET', label: t('category.sweet') },
    { key: 'DRINKS', label: t('category.drinks') },
    { key: 'SPICES', label: t('category.spices') },
    { key: 'FROZEN', label: t('category.frozen') },
    { key: 'PACKAGING', label: t('category.packaging') },
    { key: 'PRODUCTS', label: t('category.products') },
  ];


  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: 'url("https://img.computing.es/wp-content/uploads/2025/04/02163504/Gatronomia.jpg") center/cover no-repeat',
        minHeight: '100vh',
      }}
    >
      <NavBar />
      <div className='flex-grow-1'>
        <div className='p-3'>
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
          <h2 className="fw-bold text-light text-center mb-4">{t("vendor.allVendors")}</h2>
          <div className="g-4">
            <div className="col">
              <div className="card shadow-lg border-0">
                <Vendor />
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="container px-3">
            <div className="py-4">
              <h2 className="fw-bold text-light text-center mb-4">{t('category.category')}</h2>
              <div className="d-flex flex-wrap justify-content-center gap-4">
                {categories.map(({ key, label }) => (
                  <Link
                    key={key}
                    to={`/productsXCategory/${key}`}
                    className="text-decoration-none"
                    style={{
                      color: 'inherit',
                      flex: '0 0 auto',
                      width: '200px',
                    }}
                  >
                    <div className="card shadow-lg border-0 h-100 text-center p-3">
                      <h4 className="card-title fw-bold">{label}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Home;