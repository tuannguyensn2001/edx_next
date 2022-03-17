import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LessonStore {
    isShowPlaylist: boolean;
    isEnded: boolean;
}

const lessonSlice = createSlice({
    name: 'lesson',
    initialState: {
        isShowPlaylist: true,
        isEnded: false,
    },
    reducers: {
        toggleShowPlaylist: (state) => {
            state.isShowPlaylist = !state.isShowPlaylist;
        },
        setEnded: (state, action: PayloadAction<boolean>) => {
            state.isEnded = action.payload;
        },
    },
});

export const { toggleShowPlaylist, setEnded } = lessonSlice.actions;

const LessonReducer = lessonSlice.reducer;

export default LessonReducer;
