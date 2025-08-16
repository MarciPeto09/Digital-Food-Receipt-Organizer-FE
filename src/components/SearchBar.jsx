 import { useTranslation } from 'react-i18next';

 const SearchBar = ({ value, onChange, placeholder }) => {

     const { t } = useTranslation();

return (
    <div className="d-flex align-items-center">
        <form className="d-flex align-items-center my-2 my-lg-0" style={{gap: '0.5rem'}}>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={t('searchBar.placeholder')}
                className="mx-1 rounded-1 px-3 py-2"
                style={{
                    border: '2px solid #ffb347',
                    backgroundColor: '#fffbe6',
                    color: '#d35400',
                    fontWeight: 500,
                    minWidth: 180
                }}
            />
            <button
                type="submit"
                className="btn btn-primary rounded-1 d-flex align-items-center px-3 py-2"
                style={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#d35400',
                    borderColor: '#ff6f61',
                }}
            >
                <span role="img" aria-label="search">🍊</span>
                {t('searchBar.search')}
            </button>
        </form>
    </div>
);

 }; export default SearchBar;