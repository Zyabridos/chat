export const handleAxiosError = (error) => {
  let errorMessage = 'Ошибка при отправке сообщения. Попробуйте еще раз.';
  // Если ошибка от сервера и есть ответ
  if (error.response) {
    if (error.response.status === 400) {
      errorMessage = 'Неверный запрос. Проверьте данные и попробуйте снова.';
    } else if (error.response.status === 401) {
      errorMessage = 'Вы не авторизованы. Пожалуйста, войдите в систему.';
    } else if (error.response.status === 500) {
      errorMessage = 'Ошибка сервера. Попробуйте позже.';
    } else {
      errorMessage = `Ошибка: ${error.response.statusText}`;
    }
  } 
  // запрос был отправлен, но не получен ответ.
  else if (error.request) {
    errorMessage = 'Ошибка соединения. Проверьте ваше интернет-соединение.';
  } 
  else {
    errorMessage = `Произошла ошибка: ${error.message || 'Неизвестная ошибка'}`;
  }
  // Возвращаем детализированное сообщение об ошибке
  return errorMessage;
};