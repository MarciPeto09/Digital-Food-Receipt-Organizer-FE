import { useTranslation } from "react-i18next";
import { useState} from 'react';


const LanguageSelector = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        const selectedLanguage = e.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

     return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ borderColor: "#ff6f61"}}
      >
        {t('language')}
      </button>
      <ul className="dropdown-menu">
        <li>
          <button
            className={`dropdown-item ${i18n.language === 'en' ? 'active' : ''}`}
            onClick={() => i18n.changeLanguage('en')}
          >
            English
          </button>
        </li>
        <li>
          <button
            className={`dropdown-item ${i18n.language === 'it' ? 'active' : ''}`}
            onClick={() => i18n.changeLanguage('it')}
          >
            Italiano
          </button>
        </li>
      </ul>
    </div>
  );

}; export default LanguageSelector;