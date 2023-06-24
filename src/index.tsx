import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');

hydrateRoot(rootElement as HTMLElement, <BrowserRouter>
    <App />
</BrowserRouter>);
