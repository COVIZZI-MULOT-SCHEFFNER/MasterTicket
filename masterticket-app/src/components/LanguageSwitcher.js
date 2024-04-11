import React from 'react';
import { useTranslation } from 'react-i18next';
import franceFlag from '../assets/france-flag.svg';
import ukFlag from '../assets/usa-flag.svg';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="flex justify-start ml-4 space-x-4">
      <button onClick={() => changeLanguage('fr')} className="focus:outline-none">
        <img src={franceFlag} alt="Français" className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      <button onClick={() => changeLanguage('en')} className="focus:outline-none">
        <img src={ukFlag} alt="English" className="w-6 h-6 md:w-8 md:h-8" />
      </button>
    </div>
  );
}

export default LanguageSwitcher;
