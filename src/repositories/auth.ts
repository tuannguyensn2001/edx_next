import { IUser, LoginResponse, LoginType, SignupType } from 'models/IUser';
import { fetchLogin, fetchMe, fetchSignUp } from 'services/auth';
import { AxiosResponse } from 'axios';
import { MyResponse } from 'types/ResponseAPI';

export const getLogin = async (data: LoginType) => {
    const response: AxiosResponse<MyResponse<LoginResponse>> = await fetchLogin(
        data
    );
    return response.data;
};

export const getSignUp = async (data: SignupType) => {
    const response: AxiosResponse<MyResponse<any>> = await fetchSignUp(data);
    return response.data;
};

export const getMe = async () => {
    const response: AxiosResponse<MyResponse<IUser>> = await fetchMe();
    return response.data;
};
