import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = ({ amountOfMessages, channelName }) => {
  const { t } = useTranslation();

  return (
    <div className="header bg-light p-3 shadow-sm small">
      <p className="m-0">
        <b>{channelName}</b>
      </p>
      <span className="text-muted">
        {t('channelsHeader.messageCount', { count: amountOfMessages })}
      </span>
    </div>
  );
};

export default Header;
