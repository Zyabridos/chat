export const handleLoginErrors = (error, t, setErrorMessage, setAuthFailed) => {
  console.error('Login error:', error);
  if (error.response) {
    switch (error.response.status) {
      case 400:
        setErrorMessage(t('networkErrors.badRequest'));
        break;
      case 401:
        setErrorMessage(t('networkErrors.unauthorized'));
        break;
      case 500:
        setErrorMessage(t('networkErrors.serverError'));
        break;
      default:
        setErrorMessage(t('networkErrors.generalError'));
    }
  } else if (error.request) {
    setErrorMessage(t('networkErrors.connectionError'));
  } else {
    setErrorMessage(t('networkErrors.unknownError'));
  }

  setAuthFailed(true);
};

export const handleSignUpError = (error, setServerError, t) => {
  if (error.response) {
    if (error.response.status === 409) {
      setServerError(t('signup.errors.alreadyExists'));
    } else if (error.response.status === 400) {
      setServerError(t('signup.errors.badRequest'));
    } else {
      setServerError(t('signup.errors.unknown'));
    }
  } else {
    setServerError(t('signup.errors.connectionError'));
  }
};
