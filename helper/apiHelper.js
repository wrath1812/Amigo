import axios from 'axios';
import { API_URL } from '@env';
import { TOKEN } from '../constants/string';
import { getLocalStoreData, setLocalStoreData } from './localStorage';
import getNetworkStateAsync from './getNetworkStateAsync';

const config = {
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
};

const request = axios.create(config);

request.interceptors.request.use(
    async (reqConfig) => {
        const isOnline = await getNetworkStateAsync();

        if (!isOnline) {
            // Get data from local storage if offline
            const localData = await getLocalStoreData(reqConfig.url);
            if (localData) {
                return Promise.resolve({ data: localData, fromCache: true });
            }
        }

        // Online scenario: Add token to header
        const token = await getLocalStoreData(TOKEN);
        if (token) {
            reqConfig.headers = {
                ...reqConfig.headers,
                Authorization: `Bearer ${token}`,
            };
        }

        return reqConfig;
    },
    (error) => Promise.reject(error),
);

request.interceptors.response.use(
    async (response) => {
        // Store response data in local storage
        setLocalStoreData(response.config.url, response.data);
        return response;
    },
    (error) => Promise.reject(error),
);

export default request;
