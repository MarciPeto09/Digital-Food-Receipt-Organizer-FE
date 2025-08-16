import React, {useState} from 'react';
import FilterPanel from '../components/FilterPanel';
import NavBar from '../components/Navbar';

const Dashboard = () => {

    const [filters, setFilter] = useState({});

    const handleFilter = (filterValues) => {
        setFilter(filterValues);
    };

   return (
    <>
    <NavBar/> 
        <div className="dashboard-bg min-vh-100 py-5 d-flex flex-column align-items-center" style={{ background: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80") center/cover no-repeat' }}>
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
        </>
    );
}; export default Dashboard;