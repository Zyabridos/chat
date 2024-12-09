const apiPath = '/api/v1'

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/')
};


// npx eslint ./src/routes.js