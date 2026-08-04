import { Link } from "react-router-dom";
import { useAllDeals, useCreateDeal } from "../hooks/useDeals";
import { useForm } from "react-hook-form";
import { Fragment } from "react";
import { useAllContacts } from "../hooks/useContact";
import { useCompanies } from "../hooks/useCompanies";

export const Deals = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { data, isLoading, isError } = useAllDeals();
    const { data: contactsData } = useAllContacts();
    const { data: companiesData } = useCompanies();
    const createMutation = useCreateDeal();

   const onSubmit = (formData) => {
    const { company, contacts, ...rest } = formData;
    createMutation.mutate(
        { contact: contacts, company, data: { ...rest, value: Number(rest.value) } },
        { onSuccess: () => reset() }
    );
};


    if (isLoading) return <p>Deals are loading...</p>
    if (isError) return <p>There is an error loading deals!</p>

    return (
        <Fragment>
            <h2>Deals</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">Enter deal title</label>
                <input id="title" type="text" placeholder="title"
                    {...register("title",{ required: true })} />
                {errors.title && <p>{errors.title.message}</p>}

                <label htmlFor="value">Enter value</label>
                <input id="value" type="text" placeholder="value"
                    {...register("value",{ required: true })} />
                {errors.value && <p>{errors.value.message}</p>}


                <label htmlFor="stage">Enter stage</label>
                <input id="stage" type="text" placeholder="stage"
                    {...register("stage",{ required: true })} />
                {errors.stage && <p>{errors.stage.message}</p>}

                <select
                    {...register("company",{ required: true })} >
                    <option value="">Select a company</option>
                    {companiesData?.map((company) => (
                        <option key={company._id} value={company._id}>{company.name}</option>
                    ))}
                </select>

                <select
                    {...register("contacts",{ required: true })}>
                    <option value="">Select a contact</option>
                    {contactsData?.map((contact) => (
                        <option key={contact._id} value={contact._id}>{contact.name}</option>
                    ))}
                </select>

                <button type="submit"
                    disabled={createMutation.isPending}
                >{createMutation.isPending ? "Creating..." : "Create"}</button>
                {createMutation.isError && (
                    <p>{createMutation.error?.response?.data?.message || 'Failed creating a deal!'}</p>
                )}
            </form>
        </Fragment>
    )
}