import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4040', // Substitua pela URL da sua API
});

export default api;
