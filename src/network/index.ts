import axios from 'axios';

const MyAPI = axios.create({
    baseURL: 'http://localhost:5000/api',
});

MyAPI.interceptors.request.use(function (config) {
    try {
        //@ts-ignore
        config.headers.Authorization = `Bearer ${localStorage.getItem(
            'accessToken'
        )}`;
    } catch (e) {}

    return config;
});

export default MyAPI;
