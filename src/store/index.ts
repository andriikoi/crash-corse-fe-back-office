import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './usersSlice';

const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
    },
    preloadedState: typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : undefined,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
