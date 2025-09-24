import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice.js'
import urlReducer from '../features/urlSlice.js'

export const store = configureStore({
    reducer: {
        user: userReducer,
        url: urlReducer,
    },
});