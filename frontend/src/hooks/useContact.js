import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllContact, getOneContact, removeContact, editContact, createContact } from "../api/contactApi";

export const useAllContacts = () =>{
    return useQuery({
        queryKey: ['contacts'],
        queryFn: getAllContact
    })
}

export const useOneContact = (id)=>{
  return useQuery({
    queryKey: ['contact', id],
    queryFn: ()=> getOneContact(id)
  })
};

export const useDeleteContact = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => removeContact(id),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ['contacts']})
        }
    })
};

export const useEditContact = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => editContact(id, data),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:['contacts']})
        }
    })
};

export const useCreateContact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ companyId, data }) => createContact(companyId, data),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ['contacts']})
        }
    })
}
