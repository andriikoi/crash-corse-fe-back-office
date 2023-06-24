import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import Layout from '../Layout/Layout';

const PrivateRoute: FC = ({ children }) => {
    const { isAuthorized } = useAppSelector((state) => state.users);

    if (!isAuthorized) {
        return <Navigate to="/login" replace />;
    }

    return <Layout>{children}</Layout>;
};

export default PrivateRoute;
