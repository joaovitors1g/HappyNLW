import axios from 'axios';

// 192.168.1.8

const api = axios.create({
  baseURL: 'http://192.168.1.5:3333/',
});

export default api;
