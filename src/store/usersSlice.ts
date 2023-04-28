import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
    isAuthorized: boolean;
}

const initialState: IUserState = {
    isAuthorized: Boolean(localStorage.getItem('accessToken'))
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setAuthorized: (state: IUserState, action: PayloadAction<boolean>) => {
            state.isAuthorized = action.payload;
        },
    }
});

export default usersSlice;
