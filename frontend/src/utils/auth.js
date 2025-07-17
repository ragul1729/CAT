export const login = (username) => {
  localStorage.setItem('cat_operator_user', JSON.stringify({ username }));
};

export const logout = () => {
  localStorage.removeItem('cat_operator_user');
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('cat_operator_user');
};

export const getUser = () => {
  const user = localStorage.getItem('cat_operator_user');
  return user ? JSON.parse(user) : null;
};
