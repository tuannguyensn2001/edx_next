import { IUser, LoginType } from 'models/IUser';
import MyAPI from 'network';

export const fetchLogin = (data: LoginType) => {
    return MyAPI.post('/v1/auth/login', data);
};

export const fetchMe = () => {
    return MyAPI.get('/v1/auth/me');
};
