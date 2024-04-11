const getToken = () => localStorage.getItem('token');

const removeToken = () => localStorage.removeItem('token');

export { getToken, removeToken };