import axios from 'axios';
import apiConfig from '../config/apiConfig';

const register = async (userData) => {
    try {
      const response = await axios.post(`${apiConfig.baseURL}/users/register`, userData);
      console.log(response.data);
  
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        return response.data;
      } else {
        console.error('Token not provided in response');
        return null;
      }
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };
  
  const login = async (userData) => {
    try {
      const response = await axios.post(`${apiConfig.baseURL}/users/login`, userData);
      console.log(response.data);
  
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        return response.data;
      } else {
        console.error('Token not provided in response');
        return null;
      }
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };
  

export { register, login };