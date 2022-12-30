import axios from 'axios';
import { API_LINK } from '../store/api/api.slice';

export const axiosUpload = axios.create({
  baseURL: API_LINK,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});