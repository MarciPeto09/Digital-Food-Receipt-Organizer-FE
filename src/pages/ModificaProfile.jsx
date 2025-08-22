import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';


const ModificaProfile = () => {

    const API_URL = 'http://localhost:8080/api/users';
    const { t } = useTranslation();
    const { id } = useParams();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photo, setPhoto] = useState("");
    const navigate = useNavigate();


    const handleModifica = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        const userPayload = {
            username,
            password,
            email
        };

        formData.append("user", new Blob([JSON.stringify(userPayload)], { type: 'application/json' }));

        if (photo) {
            formData.append("photo", photo);
        }


        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/updateUser/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Utente aggiornato:", response.data);
        } catch (error) {
            console.error("Errore nell'aggiornamento:", error);
        }
    };

   return (
    <>
        <NavBar />
        <div className="container py-5">
            <div
                className="card shadow-lg border-0 rounded-4"
                style={{
                    background: 'linear-gradient(135deg, #fffbe6 0%, #ffe5b4 100%)',
                    border: '2px solid #ffb347'
                }}
            >
                <div className="card-body p-5 d-flex flex-column flex-md-row align-items-center">
                    <div className="w-100">
                        <form onSubmit={handleModifica} className="text-center text-md-start">
                            <div className="mb-4">
                                <span style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'inline-block' }} role="img" aria-label="chef">👩‍🍳</span>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="username" className="form-label fw-bold" style={{ color: '#d35400' }}>
                                    {t('login.username')}
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-control fw-bold"
                                    style={{
                                        border: '2px solid #ffb347',
                                        backgroundColor: '#fffbe6',
                                        color: '#d35400'
                                    }}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="form-label fw-bold" style={{ color: '#d35400' }}>
                                    {t('login.password')}
                                </label>
                                <input
                                    type="text"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control fw-bold"
                                    style={{
                                        border: '2px solid #ffb347',
                                        backgroundColor: '#fffbe6',
                                        color: '#d35400'
                                    }}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="form-label fw-bold" style={{ color: '#d35400' }}>
                                    {t('login.email')}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control fw-bold"
                                    style={{
                                        border: '2px solid #ffb347',
                                        backgroundColor: '#fffbe6',
                                        color: '#d35400'
                                    }}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="photo" className="form-label fw-bold" style={{ color: '#d35400' }}>
                                    {t('login.photo')}
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="photo"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    className="form-control fw-bold"
                                    style={{
                                        border: '2px solid #ffb347',
                                        backgroundColor: '#fffbe6',
                                        color: '#d35400'
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
                                    fontSize: '1.1rem',
                                    gap: '0.5rem'
                                }}
                                onClick={() => navigate(`/profile/${id}`)}
                            >
                                <span role="img" aria-label="save" style={{ marginRight: '0.5rem' }}>🍅</span>
                                {t('login.update')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
);
}; export default ModificaProfile;