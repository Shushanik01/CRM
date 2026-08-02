import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useGetOneCompany, useEditCompany, useDeleteCompany } from "../hooks/useCompanies";

export default function CompanyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetOneCompany();
    const updateMutation = useEditCompany();
    const deleteMutation = useDeleteCompany();
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (data) {
            reset(data)
        }
    }, [data, reset]);

    const onSubmit = (data) => {
        updateMutation.mutate({ id, updates: data })
    };

    const handleDelete = (id) => {
        deleteMutation.mutate(id, {
            onSuccess: () => {
                navigate('/companies')
            }
        })
    };

    if (isLoading) return <p>Loading...</p>

    return (
        <div>
            <h2>Edit Company</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Name" {...register('name')} />
                <input placeholder="Industry" {...register('industry')} />
                <input placeholder="Website" {...register('website')} />
                <button type="submit" disabled={updateMutation.isPending}>
                    Save Changes
                </button>
            </form>


            <button onClick={handleDelete} disabled={deleteMutation.isPending}>
                Delete Company
            </button>
        </div>
    )
}