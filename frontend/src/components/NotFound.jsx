import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import { NotFoundPicture } from './Attachments';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Navbar />
          <div className="text-center">
            <NotFoundPicture t={t} />
            <h1 className="h4 text-muted">{t('notFound.title')}</h1>
            <p className="text-muted">
              {t('notFound.message')} <a href="/">{t('notFound.linkText')}</a>
            </p>
          </div>
        </div>
        <div className="Toastify" />
      </div>
    </div>
  );
};

export default NotFound;
