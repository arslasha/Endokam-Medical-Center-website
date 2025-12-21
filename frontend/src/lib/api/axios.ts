import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Адрес вашего Django сервера
});

export default api;