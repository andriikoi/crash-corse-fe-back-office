import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import userApi from '../../api/user';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import usersSlice from '../../store/usersSlice';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { IAlertInfo } from '../../../interfaces/alert-info';

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [alertInfo, setAlertInfo] = useState<IAlertInfo | null>(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = new FormData(event.currentTarget);
            const result = await userApi.login({
                username: data.get('username'),
                password: data.get('password'),
            });

            const { data: { accessToken, refreshToken } } = result;
            localStorage.setItem('accessToken', `Bearer ${accessToken}`);
            localStorage.setItem('refreshToken', `Bearer ${refreshToken}`);

            dispatch(usersSlice.actions.setAuthorized(true));
            navigate('/profile');
        } catch (e) {
            const message = e?.response?.data?.message || e.message;
            setAlertInfo({ severity: 'error', message });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Snackbar open={Boolean(alertInfo)} autoHideDuration={3000} onClose={() => setAlertInfo(null)}>
                <Alert onClose={() => setAlertInfo(null)} severity={alertInfo?.severity} sx={{ width: '100%' }}>
                    {alertInfo?.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default SignIn;
