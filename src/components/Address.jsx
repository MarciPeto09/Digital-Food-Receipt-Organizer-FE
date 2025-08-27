import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

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

const Address = ({ onClose }) => {
    const API_URL = "http://localhost:8080/api/users";
    const { t } = useTranslation();
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
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
            (error) => {
                console.error("Geolocation error:", error);
            }
        );
    }, []);

    const handleAddressAdd = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            await axios.put(
                `${API_URL}/deliveryAddress`,
                null,
                {
                    params: {
                        userId,
                        deliveryAddress: address,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className="card shadow-lg border-box rounded-4 p-4 mt-3"
            style={{
                maxWidth: "600px",
                width: "100%",
                background: "#fffbe6",
            }}
        >
            <div className="d-flex justify-content-end">
                <button
                    onClick={onClose}
                    className="btn btn-sm border-0"
                    style={{ fontSize: "1.2rem" }}
                >
                    ✕
                </button>
            </div>
            <form onSubmit={handleAddressAdd}>
                <h5 className="text-center mb-4">{t("address.add")}</h5>

                <input
                    className="form-control mb-3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t('address.placeholder')}
                />

                {latitude && longitude ? (
                    <MapContainer
                        center={[latitude, longitude]}
                        zoom={13}
                        scrollWheelZoom={true}
                        className="mb-3"
                        style={{ height: "400px", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[latitude, longitude]} />
                        <LocationMarker setLatitude={setLatitude} setLongitude={setLongitude} setAddress={setAddress} />
                    </MapContainer>
                ) : (
                    <p>{t("address.position")}</p>
                )}

                <div className="text-center mt-3">
                    <button type="submit" className="btn btn-success">
                        {t("address.save")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Address;
