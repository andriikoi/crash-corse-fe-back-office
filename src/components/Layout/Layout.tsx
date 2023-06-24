import React, { FC, useEffect } from 'react';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import usersSlice from '../../store/usersSlice';
import userApi from '../../api/user';

const Layout: FC = ({ children }) => {
    const { isAuthorized } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();

    const getUserData = async () => {
        const { data: userData } = await userApi.getMe();
        dispatch(usersSlice.actions.setUserData(userData));
    };

    useEffect(() => {
        getUserData();
    }, [isAuthorized]);

    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        <p>Full Stack Crash Course</p>
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        {children}
                    </Container>
                </Box>
            </main>
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Developed by Andrei Dzugan
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://koitechs.com/">
                        Koitechs
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
        </div>
    )
}

export default Layout;
