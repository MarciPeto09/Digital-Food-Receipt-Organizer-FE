import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';

const FilterPanel =({ onFilter}) =>{

    const { t } = useTranslation();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [vendor, setVendor] = useState("");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        onFilter({
            startDate,
            endDate,
            category,
            vendor,
            search
        });
    };

    const categories = [
    { key: 'MEAT', label: t('category.meat') },
    { key: 'FISH', label: t('category.fish') },
    { key: 'EGGS', label: t('category.eggs') },
    { key: 'DAIRY', label: t('category.dairy') },
    { key: 'GRAINS', label: t('category.grains') },
    { key: 'VEGETABLES', label: t('category.vegetables') },
    { key: 'FRUIT', label: t('category.fruit') },
    { key: 'OIL', label: t('category.oil') },
    { key: 'SWEET', label: t('category.sweet') },
    { key: 'DRINKS', label: t('category.drinks') },
    { key: 'SPICES', label: t('category.spices') },
    { key: 'FROZEN', label: t('category.frozen') },
    { key: 'PACKAGING', label: t('category.packaging') },
    { key: 'PRODUCTS', label: t('category.products') },
  ];



    return (
        <form onSubmit={handleSubmit} className="row g-3 align-items-end justify-content-center mb-3">
            <div className="col-md-2">
                <label className="form-label fw-bold" style={{ color: '#d35400' }}>{t('filter.startDate')}</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="form-control"
                    style={{
                        border: '2px solid #ffb347',
                        backgroundColor: '#fffbe6',
                        color: '#d35400'
                    }}
                />
            </div>
            <div className="col-md-2">
                <label className="form-label fw-bold" style={{ color: '#d35400' }}>{t('filter.endDate')}</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="form-control"
                    style={{
                        border: '2px solid #ffb347',
                        backgroundColor: '#fffbe6',
                        color: '#d35400'
                    }}
                />
            </div>
            <div className="col-md-2">
                <label className="form-label fw-bold" style={{ color: '#d35400' }}>{t('filter.category')}</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-select"
                    style={{
                        border: '2px solid #ffb347',
                        backgroundColor: '#fffbe6',
                        color: '#d35400'
                    }}
                >
                    {categories.map(({ key, label }) => (
                <option
                  key={key}
                  className="text-decoration-none"
                  style={{
                    color: 'inherit',
                    flex: '0 0 auto',
                    width: '200px',
                  }}
                >
                  <div className="card shadow-lg border-0 h-100 text-center p-3">
                    <h4 className="card-title fw-bold">{label}</h4>
                  </div>
                </option>
              ))}
                </select>
            </div>
            <div className="col-md-2">
                <label className="form-label fw-bold" style={{ color: '#d35400' }}>{t('filter.vendor')}</label>
                <input
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    className="form-control"
                    style={{
                        border: '2px solid #ffb347',
                        backgroundColor: '#fffbe6',
                        color: '#d35400'
                    }}
                />
            </div>
            <div className="col-md-2">
                <label className="form-label fw-bold" style={{ color: '#d35400' }}>{t('filter.search')}</label>
                <input
                    type="text"
                    placeholder="Search receipts.."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="form-control"
                    style={{
                        border: '2px solid #ffb347',
                        backgroundColor: '#fffbe6',
                        color: '#d35400'
                    }}
                />
            </div>
            <div className="col-md-2 d-flex align-items-end">
                <button
                    type="submit"
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                    style={{
                        backgroundColor: '#ff6f61',
                        borderColor: '#ff6f61',
                        fontWeight: 600,
                        borderRadius: '20px',
                        fontSize: '1rem',
                        gap: '0.5rem'
                    }}
                >
                    <span role="img" aria-label="filter" style={{ marginRight: '0.5rem' }}>🥕</span>
                    {t('filter.applyFilters')}
                </button>
            </div>
        </form>
    );
}; export default FilterPanel;