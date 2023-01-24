import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useForm } from 'react-hook-form';

// ----------------------------------------------------------------------

export default function LoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // ---- membuat form integrasi dengan react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    });
    // ----

    return (
        <form
            onSubmit={handleSubmit((data) => {
                navigate('/dashboard/app');
            })}>
            <Stack spacing={3}>
                <TextField
                    {...register('username', { required: 'Tidak boleh kosong' })}
                    label='Username'
                    error={errors.username ? true : false}
                    autoComplete='off'
                    helperText={errors.username?.message}
                />

                <TextField
                    {...register('password', {
                        required: 'Tidak boleh kosong',
                        minLength: {
                            value: 4,
                            message: 'Min karakter 4',
                        },
                    })}
                    error={errors.password ? true : false}
                    helperText={errors.password?.message}
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>
                {/* <Checkbox name='remember' label='Remember me' />
                <Link variant='subtitle2' underline='hover'>
                    Forgot password?
                </Link> */}
            </Stack>

            <LoadingButton fullWidth size='large' type='submit' variant='contained'>
                Login
            </LoadingButton>
        </form>
    );
}
