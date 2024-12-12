// src/store/testSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { testService } from '../services/api';

export const fetchTests = createAsyncThunk(
    'tests/fetchTests',
    async () => {
        const response = await testService.getAllTests();
        return response;
    }
);

export const createTest = createAsyncThunk(
    'tests/createTest',
    async (testData) => {
        const response = await testService.createTest(testData);
        return response;
    }
);

const testSlice = createSlice({
    name: 'tests',
    initialState: {
        items: [],
        loading: false,
        error: null,
        selectedTest: null
    },
    reducers: {
        setSelectedTest: (state, action) => {
            state.selectedTest = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTests.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTests.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setSelectedTest } = testSlice.actions;
export default testSlice.reducer;