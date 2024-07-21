
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://159.138.85.198:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
