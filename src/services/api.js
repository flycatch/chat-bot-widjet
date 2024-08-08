import axios from 'axios';
import { env_var } from '../config/env';

const api = axios.create({
    baseURL: `${env_var.BASE_URL}`,
    timeout: 10000,
    headers: {
        'Content-Type' : 'application/json'
    }
});

export default api;