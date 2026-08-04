import api from './axiosConfig';

const login = async (email, password) => {
  const response = await api.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

const register = async (name, email, phone, password) => {
  const response = await api.post('/auth/register', {
    name,
    email,
    phone,
    password,
  });
  return response.data;
};

const logout = async () => {
  // Ideally ping backend to clear refresh token cookie
  // await api.get('/auth/logout');
};

const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgotpassword', { email });
  return response.data;
};

const resetPassword = async (token, password) => {
  const response = await api.put(`/auth/resetpassword/${token}`, { password });
  return response.data;
};

const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
};

export default authService;
