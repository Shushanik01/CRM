import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../api/authApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            navigate('/login')
        }
    });

    const onSubmit = (formData) => {
        mutation.mutate(formData)
    }

    return (
        <Fragment>
            <h2>Register</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Enter your name</label>
                <input id="name" placeholder="Name" type="text"
                    {...register("name", { required: true })} />
                {errors.name && <p>{errors.name.message}</p>}

                <label htmlFor="email">Enter your email</label>
                <input id="email" placeholder="email" type="text"
                    {...register("email", { required: true })} />
                {errors.email && <p>{errors.email.message}</p>}

                <label htmlFor="password">Enter your password</label>
                <input id="password" type="password" placeholder="password"
                    {...register("password", { required: true })} />
                {errors.password && <p>{errors.password.message}</p>}

                <button type="submit"
                    disabled={mutation.isPending}
                >{mutation.isPending ? 'Registering...' : 'Register'}</button>

                {mutation.isError && (
                    <p>{mutation.error.response?.data?.message || 'Failed to register'}</p>
                )}

            </form>
        </Fragment>
    )
}