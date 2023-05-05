import React, { FC, useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import userApi from '../../api/user';
import { IAlertInfo } from '../../../interfaces/alert-info';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import usersSlice from '../../store/usersSlice';
import { IUser } from '../../../interfaces/user';
import { Alert, Snackbar } from '@mui/material';

interface IFormValues {
    firstName: string;
    lastName: string;
    about: string;
}

const Profile: FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [alertInfo, setAlertInfo] = useState<IAlertInfo | null>(null);
    const { userData } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            ...userData
        },
    });

    useEffect(() => {
        const keys = userData ? Object.keys(userData) : [];
        if (keys.length > 0) {
            keys.forEach((key) => {
                userData && setValue(key, userData[key]);
            });
        }
    }, [userData]);

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        try {
            setLoading(true);
            await userApi.update(data);
            setAlertInfo({ severity: 'success', message: 'Successfully updated!' });
            dispatch(usersSlice.actions.setUserData(data as IUser));
        } catch (e) {
            const message = e?.response?.data?.message || e.message;
            setAlertInfo({ severity: 'error', message });
        } finally {
            setLoading(false);
        }
    };

    if (!userData) {
        return null;
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => <TextField
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            {...field}
                        />}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            autoFocus
                            {...field}
                        />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="about"
                        control={control}
                        render={({ field }) => <TextField
                            required
                            fullWidth
                            id="about"
                            label="About"
                            multiline
                            rows={4}
                            maxRows={6}
                            autoFocus
                            {...field}
                        />}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                disabled={isLoading}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Save
            </Button>
            <Snackbar open={Boolean(alertInfo)} autoHideDuration={3000} onClose={() => setAlertInfo(null)}>
                <Alert onClose={() => setAlertInfo(null)} severity={alertInfo?.severity} sx={{ width: '100%' }}>
                    {alertInfo?.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Profile;
