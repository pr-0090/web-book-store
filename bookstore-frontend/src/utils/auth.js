// Token management functions
export const setToken = (token) => {
  localStorage.setItem("bookstore_token", token);
};

export const getToken = () => {
  return localStorage.getItem("bookstore_token");
};

export const removeToken = () => {
  localStorage.removeItem("bookstore_token");
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};
