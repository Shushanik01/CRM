import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getUserInfo } from "../api/authApi";
import { setCredentials, logout } from "../features/auth/authSlice";

export default function useAuthCheck() {

    const dispatch = useDispatch();

    const { data, isError, isLoading } = useQuery({
        queryKey: ['AuthCheck'],
        queryFn: getUserInfo,
        retry: false
    });

    useEffect(() => {
        if (data) {
            dispatch(setCredentials({ user: data.user }))
        } if (isError) {
            dispatch(logout())
        }
    }, [data, isError, dispatch]);
    return { isLoading }
}