import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5248/api',
});

export default api;