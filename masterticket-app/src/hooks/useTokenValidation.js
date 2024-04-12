import { useEffect } from 'react';
import { getToken, removeToken } from '../services/storageService';
import axios from 'axios';
import apiConfig from '../config/apiConfig';

const useTokenValidation = () => {
  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = getToken();
      if (!token) return;
      
      try {
        await axios.get(`${apiConfig.baseURL}users/verify-token`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          removeToken();
          window.location.reload();
        }
      }
    };

    checkTokenValidity();
  }, []);
};

export default useTokenValidation;
