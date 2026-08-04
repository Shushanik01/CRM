import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDeals, getOneDeal, removeDeal, updateDeal, createDeal } from "../api/dealApi";

export const useAllDeals = () => {
    return useQuery({
        queryKey: ['deals'],
        queryFn: getDeals
    })
};

export const useOneDeal = (id) => {
    return useQuery({
        queryKey: ['deal', id],
        queryFn: () => getOneDeal(id)
    })
};

export const useCreateDeal = () => {
    const query = useQueryClient();
    return useMutation({
        mutationFn: ({ contact, company, data })=> createDeal(contact, company, data ),
        onSuccess: () => query.invalidateQueries({ queryKey: ['deals'] })
    })
};

export const useUpdateDeal = () => {
    const query = useQueryClient();
    return useMutation({
        mutationFn: ({id, newData})=> updateDeal(id, newData),
        onSuccess: ()=> query.invalidateQueries({queryKey:['deals']})
    })
};

export const useRemoveDeal = () => {
    const query = useQueryClient();
    return useMutation({
        mutationFn: removeDeal,
        onSuccess: ()=> query.invalidateQueries({queryKey: ['deals']})
    })
}