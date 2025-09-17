import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation } from "react-router-dom";

const Profile = () => {
  const API_URL = 'http://localhost:8080/api/users';

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  const [photo, setPhoto] = useState();
  const [role,setRole] = useState("");
   const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsername(response.data.username);
            setEmail(response.data.email);
            setPhoto(response.data.photo);
            setRole(response.data.role);
        } catch (error) {
            console.error(error);
        }
    };

    if (location.state?.refresh) {
      fetchUser();
    }
}, [id, location.state?.refresh]); 


  return (
    <>
    <NavBar />
    <div className="background profile-bg vw-100 vh-100 d-flex align-items-center justify-content-center">
      <section className="w-100 px-4 py-5">
        <div className="row d-flex justify-content-center">
          <div className="col col-md-9 col-lg-7 col-xl-6">
            <div className="card shadow-lg border-0 rounded-4" style={{ background: 'linear-gradient(135deg, #fffbe6 0%, #ffe5b4 100%)', border: '2px solid #ffb347' }}>
              <div className="card-body p-5 d-flex flex-column flex-md-row align-items-center">
                <div className="d-flex align-items-center w-100">
                  <img
                    src={`http://localhost:8080/uploads/${photo}`}
                    className="rounded-circle shadow"
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      border: '4px solid #ffb347',
                      background: '#fffbe6'
                    }}
                    alt="profile"
                  />
                  <div className="flex-grow-1 text-center text-md-start ms-md-4">
                    <div className="text-center text-md-start ms-md-4">
                      <span style={{ fontSize: '2.2rem', marginBottom: '0.5rem', display: 'inline-block' }} role="img" aria-label="chef">👨‍🍳</span>
                      <h2 className="fw-bold mb-2" style={{ color: '#d35400' }}>{username}</h2>
                      <h5 className="mb-3" style={{ color: '#27ae60' }}>{email}</h5>
                      <h5 className="mb-3" style={{ color: '#27ae60' }}>{role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}</h5>
                      <button
                        className="btn btn-primary btn-sm px-4"
                        style={{
                          backgroundColor: '#ff6f61',
                          borderColor: '#ff6f61',
                          fontWeight: 600,
                          borderRadius: '20px'
                        }}
                        onClick={() => navigate(`/modificaProfile/${id}`)}
                      >
                        <span role="img" aria-label="edit" style={{ marginRight: '0.5rem' }}>✏️</span>
                        Modifica Profilo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
);

}; export default Profile;