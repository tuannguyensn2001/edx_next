import { IUser, LoginResponse } from 'models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCurrentUserThunk } from 'features/auth/slices/thunk';

export interface AuthStore {
    user: IUser | null;
    isLoading: boolean;
}

const authSlice = createSlice({
    initialState: {
        user: null,
        isLoading: false,
        isLoaded: false,
    },
    name: 'auth',
    reducers: {
        setLoggedIn: function (state, action: PayloadAction<LoginResponse>) {
            // @ts-ignore
            state.user = action.payload.user;
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
        },
        startLoading(state) {
            state.isLoading = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUserThunk.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(
            getCurrentUserThunk.fulfilled,
            (state, action: PayloadAction<IUser>) => {
                // @ts-ignore
                state.user = action.payload;
                state.isLoading = false;
                state.isLoaded = true;
            }
        );
        builder.addCase(getCurrentUserThunk.rejected, (state) => {
            state.isLoading = false;
            state.isLoaded = true;
        });
    },
});

export const { setLoggedIn, startLoading } = authSlice.actions;

const AuthReducer = authSlice.reducer;

export default AuthReducer;
