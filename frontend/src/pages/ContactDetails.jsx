import { useCompanies } from "../hooks/useCompanies";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDeleteContact, useEditContact, useOneContact } from "../hooks/useContact";
import { useParams, useNavigate } from "react-router-dom";
import { Fragment } from "react";

export const ContactDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useOneContact(id);
    const { data: companiesData } = useCompanies();
    const updateMutation = useEditContact();
    const deleteMutation = useDeleteContact();
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (data) {
            reset({
                ...data,
                company: data.company?._id || ''
            })
        }
    }, [reset, data]);

    const onSubmit = (formData) => {
        updateMutation.mutate({ id, data: formData })
    };

    const handleDelete = () => {
        deleteMutation.mutate(id, { onSuccess: () => navigate('/contacts') })
    };

    if (isLoading) return <p>Loading...</p>

    return (
        <Fragment>
            <h2>Update Contact Details</h2>

            <form onSubmit={handleSubmit(onSubmit)} >
                <input placeholder="name" type="text"
                    {...register("name", { required: true })} />
                <input placeholder="email" type="text"
                    {...register("email", { required: true })} />
                <input placeholder="phone" type="text"
                    {...register("phone", { required: true })} />

                <select {...register('company')}>
                    <option value="">Select Company</option>
                    {companiesData?.map((c) => (
                        <option value={c._id} key={c._id}>{c.name}</option>
                    ))}
                </select>

                <button type="submit" disabled={updateMutation.isPending}>Save Changes</button>

            </form>
            <button onClick={handleDelete}>Delete contact</button>

        </Fragment>
    )
};
