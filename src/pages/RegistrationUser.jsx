import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { register } from '../services/authService';



const RegistrationUser = () =>{
    const { t } = useTranslation();
    const navigate = useNavigate();
    const[username,setUsername] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[userId,setUserId]=useState(0);

    const handleRegister = async (e) => {
            e.preventDefault(); 
             if (!username || !password || !email) {
                alert(t('login.credentialError'));
                return;
            }
            try {
                const userData = await register({ username, email, password });
                localStorage.setItem("userId",userData.id);
                localStorage.setItem("basketId",userData.basket.id)
                setUserId(localStorage.getItem("userId"));
                navigate("/home");
            } catch (err) {
                alert(t('login.loginError'));
            }
        };
    

        return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80") center/cover no-repeat'
            }}>
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
    );

};export default RegistrationUser;