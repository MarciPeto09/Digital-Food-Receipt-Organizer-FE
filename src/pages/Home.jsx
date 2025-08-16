import NavBar from '../components/Navbar';

const Home = () => {

  return (
    <>
    <NavBar />
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
      style={{
        background: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80") center/cover no-repeat',
        minHeight: '100vh'
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
        <span style={{ fontSize: '2.5rem', display: 'inline-block' }} role="img" aria-label="welcome">🍋</span>
        <h1 className="fw-bold mb-3" style={{ color: '#d35400' }}>
          Welcome to the Receipt Organizer
        </h1>
        <p style={{ color: '#27ae60', fontWeight: 500 }}>
          Organize, analyze, and discover your spending habits with a taste of freshness!
        </p>
        <div className="mt-4">
          <span style={{ fontSize: '1.5rem' }} role="img" aria-label="fun">🥑🍊🥕</span>
        </div>
      </div>
    </div>
    </>
  );
};
export default Home;