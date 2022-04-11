import axios from 'axios';

const MyAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MAIN_API,
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
