import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMe } from 'repositories/auth';
import { MyResponse } from 'types/ResponseAPI';
import { IUser } from 'models/IUser';
import { Axios, AxiosError } from 'axios';

export const getCurrentUserThunk = createAsyncThunk(
    'auth/fetchUser',
    async (data, thunkAPI) => {
        try {
            const response = await getMe();
            return response.data as IUser;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
