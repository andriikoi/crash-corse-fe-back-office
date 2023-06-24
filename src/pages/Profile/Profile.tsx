import React, { FC, useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
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
import { getS3ImageUrl } from '../../utils/getS3ImageUrl';
import { getImageUrl } from '../../utils/getImageUrl';
import { uploadImage } from '../../utils/uploadImage';

interface IFormValues {
    firstName: string;
    lastName: string;
    about: string;
    avatar: string;
}

const Profile: FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [alertInfo, setAlertInfo] = useState<IAlertInfo | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const { userData } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();

    const { control, handleSubmit, setValue } = useForm<IFormValues>({
        defaultValues: {
            ...userData
        },
    });

    useEffect(() => {
        const keys = userData ? Object.keys(userData) : [];
        if (keys.length > 0) {
            keys.forEach((key) => {
                if (key === 'avatar') return null;
                userData && setValue(key as keyof IFormValues, userData[key]);
            });
        }
    }, [userData]);

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        try {
            setLoading(true);

            if (image) {
                try {
                    const imagePath = `${userData.id}/${image.name}`;
                    await uploadImage(image, imagePath);
                    data.avatar = image.name;
                } catch (e) {
                    setAlertInfo({ severity: 'error', message: 'File save error' });
                    delete data.image;
                    setImage(null);
                }
            }

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

    const imageName = (image?.name || userData?.avatar || '').split('\\').reverse()[0];
    const imageSrc = image ? getImageUrl(image) : getS3ImageUrl(imageName, userData.id);

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Box display="flex" justifyContent="center" mb={3}>
                <Box height={200} width="auto">
                    <img
                        alt="avatar"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        src={imageSrc}
                    />
                </Box>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="avatar"
                        control={control}
                        render={({ field }) => <TextField
                            fullWidth
                            id="avatar"
                            type="file"
                            inputProps={{
                                accept: 'image/!*',
                                onChange: (event) => {
                                    const file = event.target.files[0];
                                    setImage(file);
                                }
                            }}
                            {...field}
                        />}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
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
    );
};

export default Profile;
