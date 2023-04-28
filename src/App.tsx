import React from 'react';
import { RouterProvider, createBrowserRouter, Link } from 'react-router-dom';
import './App.css';
import SignIn from './pages/Auth/SignIn';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <div>
                <h1>Hello World</h1>
                <Link to="about">About Us</Link>
            </div>
        ),
    },
    {
        path: '/about',
        element: <div>About</div>,
    },
    {
        path: '/loggedin',
        element: <PrivateRoute>
            <div>Вы успешно авторизовались!</div>
        </PrivateRoute>,
    },
    {
        path: '/login',
        element: (<SignIn />),
    }
]);

const App = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default App;
