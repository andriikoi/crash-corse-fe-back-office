import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
    name: 'users',
    initialState: {},
    reducers: {
        test: (state, action) => {},
    }
})

export const { test } = usersSlice.actions;

export default usersSlice.reducer;
