import axios from 'axios';
import { API_URL } from '@env';

const config = {
    baseURL: API_URL,
    timeout: 10000, // env value is a string so we need to convert it to a number
    headers: {
        'Content-Type': 'application/json',
    },
};
const request = axios.create(config);

export default request;