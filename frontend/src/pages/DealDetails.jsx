import { Fragment, useEffect } from "react";
import { useRemoveDeal, useUpdateDeal, useOneDeal } from "../hooks/useDeals";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCompanies } from "../hooks/useCompanies";
import { useAllContacts } from "../hooks/useContact";

export const DealDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const { data, isLoading } = useOneDeal(id);
    const { data: contactsData } = useAllContacts();
    const { data: companiesData } = useCompanies();
    const updateMutation = useUpdateDeal();
    const deleteMutation = useRemoveDeal();

    useEffect(() => {
        if (data) {
            reset({
                ...reset,
                contact: data.contact?.id || '',
                company: data.company?.id || ''
            })
        }
    }, [data, reset]);

    const onSubmit = (formData) => {
        updateMutation.mutate({
            id,
            updates: { ...formData, value: Number(formData.value) }
        })
    };

    const handleDelete = () => {
        deleteMutation.mutate({
            id,
            onSuccess: () => navigate('/deals')
        })
    };

    if (isLoading) return <p>Loading...</p>

    return (
        <Fragment>
            <h2>Edit Deal</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Title" {...register('title')} />
                <input type="number" placeholder="Value" {...register('value')} />

                <select {...register('stage')}>
                    <option value="lead">Lead</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                </select>

                <select {...register('contact')}>
                    <option value="">Select Contact</option>
                    {contactsData?.allContacts?.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>

                <select {...register('company')}>
                    <option value="">Select Company</option>
                    {companiesData?.allCompanies?.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>

                <button type="submit" disabled={updateMutation.isPending}>
                    Save Changes
                </button>
            </form>

            <button onClick={handleDelete}>Delete Deal</button>
        </Fragment>
    )
}