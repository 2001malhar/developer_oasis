import axios from 'axios';
import { useEffect } from 'react';

// Utility function
function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

// Custom hook
const useAuthToken = () => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    setAuthToken(token);
    },[token]);
}

export default useAuthToken;