const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  mainPage: () => '/',
  loginPage: () => '/login',
  signupPage: () => '/signup',
};
