import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCompanies, getSingleCompany, createCompany, editCompany, deleteCompany } from "../api/companyApi";

export function useCompanies() {
    return useQuery({
        queryKey: ['companies'],
        queryFn: getCompanies
    })
};

export function useCreateCompany() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] })
        }
    })
};

export function useEditCompany() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, data})=> editCompany(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] })
        }
    })
};

export function useGetOneCompany(id) {
    return useQuery({
        queryKey: ['company', id],
        queryFn: ()=> getSingleCompany(id)
    })
};

export function useDeleteCompany() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['companies']})
        }
    })
};