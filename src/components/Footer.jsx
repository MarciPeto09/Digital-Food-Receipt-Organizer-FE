import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer  = () => {
const { t } = useTranslation();

return (
  <nav className="navbar navbar-light bg-light shadow-sm border-top">
    <div className="container-fluid d-flex justify-content-end">
       <div className="navbar-nav">
      <Link to="/" className="nav-link ">
        {t('nav.logout')}
      </Link>
      </div>
    </div>
  </nav>
);

};export default Footer;
