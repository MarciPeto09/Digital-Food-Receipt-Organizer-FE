import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";


const RegistrationVendor = () => {

    const API_URL = 'http://localhost:8080/api/vendors';
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");


    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !location) {
            alert(t('login.credentialError'));
            return;
        }

        const token = localStorage.getItem("token");
        const vendorData = {
            name: name,
            location: location,
        };

        try {
            const response = await axios.post(`${API_URL}/createVendor`, vendorData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            navigate("/vendor");
        } catch (error) {
            console.error("Registration failed: ", error);
            throw error.response?.data || { message: 'Registration failed. Please try again.' };
        }
    };

    return (
        <>
            <NavBar />
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80") center/cover no-repeat' }}>
                <div
                    className="card shadow-lg border-0 rounded-4 p-4"
                    style={{
                        maxWidth: '400px',
                        width: '100%',
                        background: 'linear-gradient(135deg, #fffbe6 0%, #ffe5b4 100%)',
                        border: '2px solid #ffb347'
                    }}
                >
                    <div className="text-center mb-4">
                        <span style={{ fontSize: '2.2rem', display: 'inline-block' }} role="img" aria-label="register">🍯</span>
                        <h2 className="fw-bold mb-0" style={{ color: '#d35400' }}>{t('login.register')}</h2>
                    </div>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-bold" style={{ color: '#d35400' }}>
                                {t('register.name')}
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={{
                                    border: '2px solid #ffb347',
                                    backgroundColor: '#fffbe6',
                                    color: '#d35400',
                                    height: '42px'
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label fw-bold" style={{ color: '#d35400' }}>
                                {t('register.location')}
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                                style={{
                                    border: '2px solid #ffb347',
                                    backgroundColor: '#fffbe6',
                                    color: '#d35400',
                                    height: '42px'
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                            style={{
                                backgroundColor: '#ff6f61',
                                borderColor: '#ff6f61',
                                fontWeight: 600,
                                borderRadius: '20px',
                                fontSize: '1rem',
                                gap: '0.5rem',
                                height: '42px'
                            }}
                        >
                            <span role="img" aria-label="register" style={{ marginRight: '0.5rem' }}>🍯</span>
                            {t('login.register')}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}; export default RegistrationVendor;