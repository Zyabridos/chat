import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = ({ amountOfMessages }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{t('channelsHeader.channelName')}</b>
      </p>
      <span className="text-muted">
        {t('channelsHeader.messageCount', { count: amountOfMessages })}
      </span>
    </div>
  );
};

export default Header;
