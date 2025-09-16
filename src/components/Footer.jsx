import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer  = () => {
const { t } = useTranslation();

return (
  <nav className="footer">
  <div className="container-fluid d-flex justify-content-between">
    <Link to="https://github.com/MarciPeto09" className="nav-link">Marcelina GitHub</Link>
    <Link to="/" className="nav-link">{t('nav.logout')}</Link>
  </div>
</nav>
);

};export default Footer;
