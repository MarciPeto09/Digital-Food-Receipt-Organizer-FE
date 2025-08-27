import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <>
    <NavBar />
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
      style={{
        background: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80") center/cover no-repeat'
      }}
    >
      
      <div
        className="card shadow-lg border-0 rounded-4 p-5 mt-5"
        style={{
          background: 'linear-gradient(135deg, #fffbe6 0%, #ffe5b4 100%)',
          border: '2px solid #ffb347',
          maxWidth: 500,
          width: '100%',
          textAlign: 'center'
        }}
      >
        <Link to="/vendor" className="nav-link" style={{ color: '#27ae60', fontWeight: 1000 }}>Vendor</Link>
      </div>


      <div
        className="card shadow-lg border-0 rounded-4 p-5 mt-5"
        style={{
          background: 'linear-gradient(135deg, #fffbe6 0%, #ffe5b4 100%)',
          border: '2px solid #ffb347',
          maxWidth: 500,
          width: '100%',
          height: '100%',
          textAlign: 'center'
        }}
      >
        <Link to="/ordination" className="nav-link" style={{ color: '#27ae60', fontWeight: 1000 }}>Food</Link>
      </div>
    </div>
    <Footer/>
    </>
  );
};
export default Home;