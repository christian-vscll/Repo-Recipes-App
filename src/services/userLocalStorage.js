const verifyUser = () => {
  if (localStorage.getItem('user') === null) {
    localStorage.setItem('user', JSON.stringify({ email: '' }));
  }
};

const getEmail = () => {
  verifyUser();
  const emailObj = JSON.parse(localStorage.getItem('user'));
  const { email } = emailObj;
  return email;
};

const logout = () => {
  localStorage.clear();
};

export default {
  getEmail,
  logout,
};
