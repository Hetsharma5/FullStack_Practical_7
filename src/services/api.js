import axios from 'axios';

// Configure Axios instance for FakeStoreAPI
const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000, // 10 seconds timeout
});

export default api;
