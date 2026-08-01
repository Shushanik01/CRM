import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/authApi';
import { useDispatch } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../features/auth/authSlice.js'

export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            dispatch(setCredentials(data))
            navigate('dashboard')
        }
    });

    const onSubmit = (formData) => {
        mutation.mutate(formData)
    };

    return (
        <form action="submit">

            <label htmlFor="email"></label>
            <input type="text" placeholder="email" name="email"
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <label htmlFor="password"></label>
            <input type="text" placeholder="password" name="password"
                {...register('password', { required: true })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <button>{mutation.isPending ? 'Logging In...' : 'LogIn'} </button>
            {mutation.isError && (
                <p>{mutation.error.response?.data?.message || 'Login failed'}</p>
            )}
        </form>
    )
}