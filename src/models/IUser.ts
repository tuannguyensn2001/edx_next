export declare interface IUser {
    email: string;
    password: string;
    username: string;
    id: string;
}

export type LoginType = Pick<IUser, 'email' | 'password'>;
export type SignupType = Pick<IUser, 'email' | 'password' | 'username'>;

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    user: IUser;
};
