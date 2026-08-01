import {useForm} from '@tanstack/react-query'

export const Login = () => { 

    const { register, handleSubmit, formState : {errors}} = useForm()


    return (
        <form action="submit">

            <label htmlFor="email"></label>
            <input type="text" placeholder="email" name="email"
            {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
            />    

            <label htmlFor="password"></label>
            <input type="text" placeholder="password" name="password"/>

            <button></button>
        </form>
    )
}