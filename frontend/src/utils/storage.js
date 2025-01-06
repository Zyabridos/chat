const TOKEN_KEY = 'token';
const STORAGE_KEY = 'user';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getUserAndTokenFromStorage = () => {
  const user = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const token = user?.token;
  return { user, token };
};

export const getUserFromStorage = () => {
  const user = localStorage.getItem(STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

export const saveUserToStorage = (user) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const removeUserFromStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};
