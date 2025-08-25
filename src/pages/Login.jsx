import { useNavigate } from "react-router-dom";
import { login } from '../services/authService';
import { useTranslation } from 'react-i18next';
import { useState } from "react";


const Login = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert(t('login.credentialError'));
      return;
    }
    try {
      const { token, user } = await login({ username, password });
      localStorage.setItem("userId", user.id);
      localStorage.setItem("basketId", user.basket.id);
      localStorage.setItem("userRole", user.role); 
      navigate("/home");
    } catch (err) {
      setError(err.message || t('login.loginError'));
    }
  };

 return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
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
          <span style={{ fontSize: '2.2rem', display: 'inline-block' }} role="img" aria-label="login">🍞</span>
          <h1 className="fw-bold mb-0" style={{ color: '#d35400' }}>Login</h1>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-bold" style={{ color: '#d35400' }}>
              {t('login.username')}
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('login.username')}
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
            <label htmlFor="password" className="form-label fw-bold" style={{ color: '#d35400' }}>
              {t('login.password')}
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('login.password')}
              required
              style={{
                border: '2px solid #ffb347',
                backgroundColor: '#fffbe6',
                color: '#d35400',
                height: '42px'
              }}
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3 d-flex align-items-center justify-content-center"
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
            <span role="img" aria-label="login" style={{ marginRight: '0.5rem' }}>🥐</span>
            {t('login.logButton')}
          </button>
        </form>

        <div className="text-center mt-3">
          <button
            onClick={() => navigate('/register')}
            className="btn btn-outline-secondary"
            style={{
              border: '2px solid #ffb347',
              color: '#d35400',
              backgroundColor: '#fffbe6',
              fontWeight: 600,
              borderRadius: '20px',
              height: '42px'
            }}
          >
            {t('login.register')}
          </button>
        </div>
      </div>
    </div>
  );

}; export default Login;