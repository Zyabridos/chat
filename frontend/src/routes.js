const apiPath = '/api/v1'

export default {
  loginPath: () => [apiPath, 'login'].join('/')
};


// npx eslint ./src/routes.js