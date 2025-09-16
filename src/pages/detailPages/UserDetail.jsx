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
            <div className="conteiner d-flex justify-content-center mt-5">
                {loading && <p>Loading...</p>}
                {!loading && !user && <p>User not found</p>}
                {!loading && user && (
                    <div className="card h-100 w-50 shadow-lg border-0 rounded-4 p-4 text-dark f-flex align-items-center product-card">
                        <img
                            src={photo ? `http://localhost:8080/uploads/${photo}` : '/default-profile.png'}
                            className="rounded-circle shadow mb-2"
                            style={{
                                width: '120px',
                                height: '120px',
                                objectFit: 'cover',
                                border: '4px solid #ffb347',
                                background: '#fffbe6'
                            }}
                            alt="profile"
                        />
                            <h3>{user.username}</h3>
                            <p>{user.role}</p>
                            <p>{user.email}</p>
                            <p>{user.deliveryAddress}</p>
                            <p className="text-danger">Chat To be implemented</p>
                        </div>
                )}
            </div>
            <Footer />
        </>);
}; export default UserDetail;