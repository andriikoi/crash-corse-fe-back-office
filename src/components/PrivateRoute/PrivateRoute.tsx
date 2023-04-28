import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

const PrivateRoute: FC = ({ children }) => {
    const { isAuthorized } = useAppSelector((state) => state.users);

    if (!isAuthorized || !localStorage.getItem('accessToken')) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
