import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";


const UserDetail = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [photo, setPhoto] = useState();
    const { t } = useTranslation();
    const API_URL = 'http://localhost:8080/api/users';


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUser(response.data);
                setPhoto(response.data.photo);
                setLoading(false);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        if (userId) fetchUsers();
    }, [userId]);

   return (
        <>
            <NavBar />
            <div className="background min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="w-100" style={{ maxWidth: 420 }}>
                    {loading && <div className="text-center text-secondary">Loading...</div>}
                    {!loading && !user && <div className="alert alert-warning text-center">User not found</div>}
                    {!loading && user && (
                        <div className="card shadow-lg border-0 rounded-4 p-4 text-dark align-items-center">
                            <div className="text-center mb-3">
                            </div>
                            <img
                                src={photo ? `http://localhost:8080/uploads/${photo}` : '/default-profile.png'}
                                className="rounded-circle shadow mb-3 border border-warning border-4"
                                style={{
                                    width: '120px',
                                    height: '120px',
                                    objectFit: 'cover',
                                    background: '#fffbe6'
                                }}
                                alt="profile"
                            />
                            <h3 className="fw-bold mb-1" style={{ color: '#d35400' }}>{user.username}</h3>
                            <p className="mb-1 text-secondary">{user.role}</p>
                            <p className="mb-1">{user.email}</p>
                            <p className="mb-2">{user.deliveryAddress}</p>
                            <div className="alert alert-danger py-2 mb-0">Chat To be implemented</div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}; export default UserDetail;