import axios from 'axios';
import apiConfig from '../config/apiConfig';

const patchUserData = async (userData, token) => {
  const response = await axios.patch(`${apiConfig.baseURL}/users`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const fetchUserData = async (token) => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { patchUserData, fetchUserData };
