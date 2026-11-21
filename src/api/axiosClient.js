import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/';

const axiosClient = axios.create({
    baseURL: rawBaseUrl.replace(/\/+$/, ''),
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('tb_auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            'Something went wrong. Please try again.';

        return Promise.reject({
            status: error?.response?.status || 500,
            message,
            raw: error,
        });
    }
);

export default axiosClient;