import { useTranslation } from 'react-i18next';

export const handleAxiosError = (error) => {
  const { t } = useTranslation(); 
  let errorMessage = t('error.generalError');
  
  // Если ошибка от сервера и есть ответ
  if (error.response) {
    if (error.response.status === 400) {
      errorMessage = t('networkErrors.badRequest');
    } else if (error.response.status === 401) {
      errorMessage = t('networkErrors.unauthorized');
    } else if (error.response.status === 500) {
      errorMessage = t('networkErrors.serverError');
    } else {
      errorMessage = `${t('networkErrors.error')}: ${error.response.statusText}`;
    }
  } 
  // запрос был отправлен, но не получен ответ.
  else if (error.request) {
    errorMessage = t('networkErrors.connectionError');
  } 
  else {
    errorMessage = `${t('networkErrors.unknownError')}: ${error.message || t('error.unknown')}`;
  }

  return errorMessage;
};
