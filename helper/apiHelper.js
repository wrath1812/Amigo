import axios from 'axios';
import { API_URL } from '@env';
import { TOKEN } from '../constants/string';
import { getLocalStoreData } from './localStorage';
import getNetworkStateAsync from "./getNetworkStateAsync";
const config = {
    baseURL: API_URL,
    timeout: 10000, // env value is a string so we need to convert it to a number
    headers: {
        'Content-Type': 'application/json',
    },
};
const request = axios.create(config);
request.interceptors.request.use(
    async (reqConfig) => {
        const reqHeader = { ...reqConfig };
        const token = await getLocalStoreData(TOKEN);
        if (token) {
            reqHeader.headers = {
                ...reqConfig.headers,
                Authorization: `Bearer ${token}`,
            };
        }

        return reqHeader;
    },
    (error) => Promise.reject(error),
);
export default request;
