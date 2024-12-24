import { useTranslation } from 'react-i18next';

const LoginFooter = () => {
  const { t } = useTranslation();
  return (
    <div className="card-footer p-4">
      <div className="text-center">
        <span>{t('login.footer.noAccount?')}</span>
        <a href="/signup">{t('login.footer.registration')}</a>
      </div>
    </div>
  );
};

export default LoginFooter;
