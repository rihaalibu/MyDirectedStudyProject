import axios from 'axios';

export const createAuthenticatedAxios = () => {
  return axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
};
