import { IUser, LoginType, SignupType } from 'models/IUser';
import MyAPI from 'network';

export const fetchLogin = (data: LoginType) => {
    return MyAPI.post('/v1/auth/login', data);
};

export const fetchSignUp = (data: SignupType) => {
    return MyAPI.post('/v1/auth/register', data);
};

export const fetchMe = () => {
    return MyAPI.get('/v1/auth/me');
};
