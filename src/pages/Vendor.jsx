import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Vendor = () => {
    const API_URL = 'http://localhost:8080/api/vendors';
    const { t } = useTranslation();
    const [vendor, setVendor] = useState([]);
    const navigate = useNavigate();

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
    }, [vendor]);

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
        <>
            <NavBar />
            <div className="background">
                <div className="container py-4">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-4">
                        {vendor.map((vendor) => (
                            <Link
                                to={`/vendorProductOrdination/${vendor.id}`}
                                className="text-decoration-none"
                                style={{ color: "inherit" }}
                            >
                                <div key={vendor.id || vendor.name} className="col">
                                    <div
                                        className="card h-100 text-dark text-center shadow-sm border-0"
                                        style={{ aspectRatio: "1 / 1", borderRadius: "12px" }}
                                    >
                                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                            <h4 className="card-title fw-bold">{vendor.name}</h4>
                                            <h6 className="card-title fst-italic">~{vendor.location}~</h6>
                                       
                                        <button onClick={(e) => handleDelete(e, vendor)} className="btn btn-sm btn-danger fw-semibold rounded-pill">{t('basket.delete')}</button>
                                    </div>
                                </div>
                            </div>
                             </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );

}; export default Vendor;