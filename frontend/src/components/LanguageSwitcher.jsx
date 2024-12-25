import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
// change import evnt
import './commonStyles.css';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="link" id="dropdown-changeLanguafe" className="btn btn-anthracite">
        {i18n.language.toUpperCase()}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as="button" onClick={() => changeLanguage('en')}>
          {t('en')}
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => changeLanguage('ru')}>
          {' '}
          {t('ru')}
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => changeLanguage('no')}>
          {' '}
          {t('no')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
