import { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Vendor = () => {
    const API_URL = 'http://localhost:8080/api/vendors';
    const { t } = useTranslation();
    const [vendor, setVendor] = useState([]);
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [scrolling, setScrolling] = useState(false);

    const scrollRight = () => {
        if (containerRef.current) {
            setScrolling(true);
            containerRef.current.scrollBy({ left: 220, behavior: 'smooth' });
        }
    };

    const scrollLeft = () => {
        if (containerRef.current) {
            setScrolling(true);
            containerRef.current.scrollBy({ left: -220, behavior: 'smooth' });
        }
    };

     const handleInfiniteScroll = () => {
        const container = containerRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const currentScroll = container.scrollLeft;
        if (currentScroll + clientWidth >= scrollWidth) {
            container.scrollLeft = 0; 
        }
    };


    useEffect(() => {
        const interval = setInterval(() => {
            if (containerRef.current && !scrolling) {
                containerRef.current.scrollBy({ left: 220, behavior: 'smooth' });
                handleInfiniteScroll();
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [scrolling]);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_URL}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setVendor(response.data);
            } catch (error) {
                console.log(error);
            }

        }
        fetchVendors();
    }, []);

    const handleDelete = async (e, vendor) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const response = await axios.delete(`${API_URL}/delete/${vendor.id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate("/vendor");
        } catch (error) {
            console.error("Registration failed: ", error);
            throw error.response?.data || { message: 'Registration failed. Please try again.' };
        }
    };



     return (
    <div className="position-relative">
      <div
        className="d-flex overflow-auto no-scrollbar"
        ref={containerRef}
        style={{ padding: '0 40px', position: 'relative',whiteSpace: 'nowrap',}} >
        {vendor.map((vendor) => (
          <Link
            to={`/vendorProductOrdination/${vendor.id}`}
            className="text-decoration-none"
            style={{
              color: 'inherit',
              flex: '0 0 auto',
              width: '200px',
              marginRight: '16px',
            }}
            key={vendor.id || vendor.name}
          >
            <div className="col">
              <div
                className="card h-100 text-dark text-center shadow-sm border-0"
                style={{
                  aspectRatio: '1 / 1',
                  borderRadius: '12px',
                  transition: 'transform 0.3s ease',
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <h4 className="card-title fw-bold">{vendor.name}</h4>
                  <h6 className="card-title fst-italic">~{vendor.location}~</h6>
                  <button
                    onClick={(e) => handleDelete(e, vendor)}
                    className="btn btn-sm btn-danger fw-semibold rounded-pill"
                  >
                    {t('basket.delete')}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <button
        className="btn btn-light position-absolute  d start-0 top-50 translate-middle-y"
        onClick={scrollLeft}
        style={{ zIndex: 10 }}
      >
        &lt;
      </button>
      <button
        className="btn btn-light position-absolute  end-0 top-50 translate-middle-y"
        onClick={scrollRight}
        style={{ zIndex: 10 }}
      >
        &gt;
      </button>
    </div>
  );
}; export default Vendor;