import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { register } from '../services/authService';
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const RegistrationUser = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const roleMap = {
        user: "ROLE_USER",
        vendor: "ROLE_VENDOR",
        admin: "ROLE_ADMIN",
        analyst: "ROLE_ANALYST"
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!username || !password || !email || !role) {
            alert(t('login.credentialError'));
            return;
        }
        try {
            const userData = await register({ username, email, password, role: roleMap[role] });
            navigate("/home");
        } catch (err) {
            alert(t('login.loginError'));
            console.error('Registration failed:', err.response);
        }
    };


    return (
        <>
        <NavBar />
        <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'url("https://img.computing.es/wp-content/uploads/2025/04/02163504/Gatronomia.jpg") center/cover no-repeat' }}>
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
                    <h2 className="fw-bold mb-0" style={{ color: '#d35400' }}>{t('nav.register')}</h2>
                </div>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label fw-bold" style={{ color: '#d35400' }}>
                            {t('login.username')}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                        <label htmlFor="email" className="form-label fw-bold" style={{ color: '#d35400' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                border: '2px solid #ffb347',
                                backgroundColor: '#fffbe6',
                                color: '#d35400',
                                height: '42px'
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label fw-bold" style={{ color: '#d35400' }}>
                            {t('login.password')}
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        <label htmlFor="role" className="form-label fw-bold" style={{ color: '#d35400' }}>Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)} className="form-control" style={{
                            border: '2px solid #ffb347',
                            backgroundColor: '#fffbe6',
                            color: '#d35400',
                            height: '42px'
                        }} >
                            <option value="">Role... </option>
                            <option value="user">USER</option>
                            <option value="vendor">VENDOR</option>
                            <option value="admin">ADMIN</option>
                            <option value="analyst">ANALYST</option>
                        </select>

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
        <Footer/>
  </>
    );

}; export default RegistrationUser;