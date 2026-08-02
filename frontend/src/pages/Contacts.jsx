import { Fragment } from "react"
import { useForm } from "react-hook-form";
import { useAllContacts, useCreateContact } from "../hooks/useContact";
import { useCompanies } from "../hooks/useCompanies";
import { Link } from "react-router-dom";

export const Contacts = () => {

    const createMutation = useCreateContact();
    const { data, isLoading, isError } = useAllContacts()
    const { data: companies } = useCompanies();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (formData) => {
        const { company, ...data } = formData;
        createMutation.mutate({ companyId: company, data }, {
            onSuccess: () => reset()
        });

    };

    if (isLoading) return <p>Contacts are loading...</p>
    if (isError) return <p>Error loading contacts!</p>

    return (
        <Fragment>
            <h2>Contacts</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="name">Enter contact name</label>
                <input id="name" type="text" placeholder="name"
                    {...register("name", { required: true })} />
                {errors.name && <p>{errors.name.message}</p>}

                <label htmlFor="email">Enter email</label>
                <input id="email" type="text" placeholder="email"
                    {...register("email", { required: true })} />
                {errors.email && <p>{errors.email.message}</p>}

                <label htmlFor="phone">Enter phone number</label>
                <input id="phone" type="number" placeholder="phone"
                    {...register("phone", { required: true })} />
                {errors.phone && <p>{errors.phone.message}</p>}

                <select {...register('company')}>
                    <option>Select a company</option>
                    {companies?.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>

                <button disabled={createMutation.isPending}
                >{createMutation.isPending ? 'Adding...' : 'Add contact'}</button>
            </form>

            <ul>
                {data.map((contact) => (
                    <li key={contact._id}>
                        <Link to={`/contacts/${contact._id}`}>{contact.name} - {contact.company?.name || 'No company'}</Link>
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}
