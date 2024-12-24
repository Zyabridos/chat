import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

const LoginFooter = () => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);

  return (
    <div className="card-footer p-4">
      <div className="text-center">
        <span>{t('login.footer.noAccount?')}</span>
        <a
          href="/signup"
          style={{
            color: hovered ? '#777' : 'black',
            transition: 'color 0.3s ease',
            // textDecoration: 'none',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {t('login.footer.registration')}
        </a>
      </div>
    </div>
  );
};

export default LoginFooter;
