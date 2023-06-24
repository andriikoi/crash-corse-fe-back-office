import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SignIn from '../pages/Auth/SignIn';
import Profile from '../pages/Profile/Profile';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

const Router = () => (
    <Routes>
        <Route
            path="/"
            element={<PrivateRoute>
                <h1>Dashboard</h1>
                <Link to="/login">Login</Link>
                <br />
                <br />
                <Link to="/profile">Profile</Link>
            </PrivateRoute>}
        />
        <Route path="/login" element={<SignIn />} />
        <Route
            path="/profile"
            element={<PrivateRoute>
                <Profile />
            </PrivateRoute>}
        />
    </Routes>
);

export default Router;
