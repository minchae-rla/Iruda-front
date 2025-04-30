// src/config/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 서버 주소에 맞게 조정
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;