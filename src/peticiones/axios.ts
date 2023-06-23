import axios, { AxiosInstance } from 'axios';
import { API_KEY, BASE_URL } from '../variables';

export const axiosI: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apiKey: API_KEY,
  },
});
