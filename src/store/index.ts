import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from 'features/auth/slices';
import LessonReducer from 'features/lesson/slices';
import AppReducer from 'apps';

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        lesson: LessonReducer,
        app: AppReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
