import axios from 'axios';

export const axiosUpload = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});