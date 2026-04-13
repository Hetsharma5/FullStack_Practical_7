import axios from 'axios';

// Configure Axios instance for FakeStoreAPI
export const BASE_URL = 'http://localhost:5000'; // Target server base

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
});

export default api;
