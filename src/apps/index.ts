import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const AppSlice = createSlice({
    name: 'app',
    initialState: {
        isPrevented: false,
        router: '',
    },
    reducers: {
        preventRouter(state, action: PayloadAction<string>) {
            state.isPrevented = true;
            state.router = action.payload;
        },
        cancelPrevent(state) {
            state.isPrevented = false;
            state.router = '';
        },
    },
});

const AppReducer = AppSlice.reducer;

export const { preventRouter, cancelPrevent } = AppSlice.actions;

export default AppReducer;
