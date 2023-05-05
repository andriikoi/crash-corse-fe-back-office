import React, { useEffect, useMemo } from 'react';
import { RouterProvider, createBrowserRouter, Link } from 'react-router-dom';
import './App.css';
import SignIn from './pages/Auth/SignIn';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Layout from './components/Layout/Layout';
import Profile from './pages/Profile/Profile';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import userApi from './api/user';
import usersSlice from './store/usersSlice';

const App = () => {
    const { isAuthorized } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();

    const router = useMemo(() => createBrowserRouter([
        {
            path: '/',
            element: (
                <div>
                    <h1>Hello World</h1>
                    <Link to="Profile">Profile</Link>
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
        },
        {
            path: '/profile',
            element: (<PrivateRoute>
                <Profile />
            </PrivateRoute>),
        }
    ]), []);

    const getUserData = async () => {
      const { data: userData } = await userApi.getMe();
      dispatch(usersSlice.actions.setUserData(userData));
    };

    useEffect(() => {
       getUserData();
    }, [isAuthorized]);

    return (
        <Layout>
            <RouterProvider router={router} />
        </Layout>
    )
}

export default App;
