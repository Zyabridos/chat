import avatarLogo from '../assets/avatar-DIE1AEpS.jpg';
import sugnupAvatar from '../assets/signupAvatar.jpg';
import notFound from '../assets/404-NotFound.svg';
import loading from '../assets/loading.gif';

export const LoadingBar = ({ t }) => {
  return (
  <div className="loading-container">
    <img src={loading} alt={t('loading.loading')} className="loading-gif" />
    <div>{t('loading.loadingChannels')}</div>
  </div>
  )
};

export const LoginPicture = ({ t }) => {
  return (
  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
    <img src={avatarLogo} className="rounded-circle" alt={t('login.title')} />
  </div>
  )
};

export const SugnupPicture = ({ t }) => {
  return (
  <div>
    <img src={sugnupAvatar} className="rounded-circle" alt={t('signup.title')} />
  </div>
  )
};

export const NotFoundPicture = ({ t }) => {
return (
  <img
    alt={t('notFound.title')}
    className="img-fluid"
    style={{ maxWidth: '450px', height: 'auto' }}
    src={notFound}
  />
  )
};
