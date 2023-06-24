import React from 'react';
import Router from './router/Router';
import createEmotionCache from './utils/createEmotionCache';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import store from './store';

const cache = createEmotionCache();

const theme = createTheme();

const App = () => {
    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <CssBaseline />
                    <Router />
                </Provider>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default App;
