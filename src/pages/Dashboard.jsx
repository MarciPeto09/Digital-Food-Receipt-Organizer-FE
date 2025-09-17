import React, {useState} from 'react';
import FilterPanel from '../components/FilterPanel';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {

    const [filters, setFilter] = useState({});

    const handleFilter = (filterValues) => {
        setFilter(filterValues);
    };

   return (
    <>
    <NavBar/> 
        <div className="background dashboard-bg min-vh-100 py-5 d-flex flex-column align-items-center">
            <div className="card shadow-lg border-0 rounded-4 w-100" style={{ maxWidth: 900, background: 'linear-gradient(135deg, #fffbe6 0%, #ffe5b4 100%)', border: '2px solid #ffb347' }}>
                <div className="card-body p-4">
                    <div className="mb-4 text-center">
                        <span style={{ fontSize: '2.2rem', marginBottom: '0.5rem', display: 'inline-block' }} role="img" aria-label="dashboard">🥗</span>
                        <h2 className="fw-bold mb-0" style={{ color: '#d35400' }}>Dashboard</h2>
                    </div>
                    <FilterPanel onFilter={handleFilter} />
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}; export default Dashboard;