import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../services/storageService';

const useUserRole = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          setRole(null);
        } else {
          setRole(decodedToken.role);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setRole(null);
      }
    }
  }, []);

  return role;
};

export default useUserRole;