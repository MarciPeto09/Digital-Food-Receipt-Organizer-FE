import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet icon URL issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom Location Marker Component
const LocationMarker = ({ setLatitude, setLongitude, setAddress }) => {
    useMapEvents({
        click: async (e) => {
            const { lat, lng } = e.latlng;
            setLatitude(lat);
            setLongitude(lng);

            try {
                const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
                    params: {
                        lat,
                        lon: lng,
                        format: "json",
                    },
                    headers: {
                        "Accept-Language": "en",
                    },
                });

                if (response.data && response.data.display_name) {
                    setAddress(response.data.display_name);
                } else {
                    setAddress("Address not found");
                }
            } catch (error) {
                console.error("Nominatim error:", error);
                setAddress("Failed to fetch address");
            }
        },
    });

    return null;
};

const RegistrationVendor = () => {
    const API_URL = 'http://localhost:8080/api/vendors';
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

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
            latitude: latitude,
            longitude: longitude,
        };

        try {
            const response = await axios.post(`${API_URL}/createVendor`, vendorData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            navigate("/home");
        } catch (error) {
            console.error("Registration failed: ", error);
            alert(error.response?.data || t('register.error'));
        }
    };

    return (
        <>
            <NavBar />
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'url("https://img.computing.es/wp-content/uploads/2025/04/02163504/Gatronomia.jpg") center/cover no-repeat' }}>
                <div
                    className="card shadow-lg border-0 rounded-4 p-4"
                    style={{
                        maxWidth: '600px',
                        width: '100%',
                        background: 'linear-gradient(135deg, #fffbe6 0%, #ffe5b4 100%)',
                        border: '2px solid #ffb347'
                    }}
                >
                    <div className="text-center mb-4">
                        <span style={{ fontSize: '2.2rem', display: 'inline-block' }} role="img" aria-label="register">🍯</span>
                        <h2 className="fw-bold mb-0" style={{ color: '#d35400' }}>{t('nav.registerVendor')}</h2>
                    </div>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-bold" style={{ color: '#d35400' }}>
                                {t('register.name')}
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
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
                                id="location"
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

                        {/* Map for selecting address */}
                        <div className="mb-3">
                            <h5 className="text-center">{t("address.address")}</h5>
                            <MapContainer
                                center={[latitude || 51.505, longitude || -0.09]}
                                zoom={13}
                                scrollWheelZoom={true}
                                style={{ height: "300px", width: "100%" }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <LocationMarker setLatitude={setLatitude} setLongitude={setLongitude} setAddress={setLocation} />
                                {latitude && longitude && <Marker position={[latitude, longitude]} />}
                            </MapContainer>
                            <input
                                type="text"
                                className="form-control mt-2"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder={t("address.selected")}
                                readOnly
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
};

export default RegistrationVendor;
