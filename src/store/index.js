// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import testReducer from './testSlice';
import reportReducer from './reportSlice';

export const store = configureStore({
    reducer: {
        tests: testReducer,
        reports: reportReducer
    }
});

export default store;