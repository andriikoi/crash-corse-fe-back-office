import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user';

interface IUserState {
    isAuthorized: boolean;
    userData: IUser | null;
}

const initialState: IUserState = {
    isAuthorized: Boolean(typeof window !== 'undefined' && localStorage.getItem('accessToken')),
    userData: null
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setAuthorized: (state: IUserState, action: PayloadAction<boolean>) => {
            state.isAuthorized = action.payload;
        },
        setUserData: (state: IUserState, action: PayloadAction<IUser>) => {
            state.userData = action.payload;
        }
    }
});

export default usersSlice;
