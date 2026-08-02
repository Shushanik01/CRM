import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useCompanies, useCreateCompany} from "../hooks/useCompanies";

export default function Companies() {

    const createMutation = useCreateCompany()
    const { data, isLoading, isError } = useCompanies()
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        createMutation.mutate(data, {
            onSuccess: () => reset()
        })
    };

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Failed to load companies</p>

    return (
        <Fragment>
            <h2>Companies</h2>
            <form action="submit"
            onSubmit={handleSubmit(onSubmit)}
            >

                <label htmlFor="name">Enter company name</label>
                <input id='name' type="text" placeholder="Name"
                    {...register("name", { required: true })} />
                {errors.name && <p role="alert">Company name is required.</p>}

                <label htmlFor="Industry">Enter Industry</label>
                <input id="Industry" type="text" placeholder="Industry name"
                    {...register("Industry", { required: true })} />
                {errors.Industry && <p role="alert">Industry is required.</p>}

                <label htmlFor="Website">Enter website</label>
                <input id="Website" type="text" placeholder="Website"
                    {...register("Website", { required: true })} />
                {errors.Website && <p role="alert">Website is required.</p>}

                <button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? 'Adding...' : 'Add Company'}
                </button>
            </form>

            {createMutation.isError && (
                <div>
                    {createMutation.error.response?.data?.message}
                </div>
            )};

            <ul>
                {
                    data.allCompanies?.map((company)=>{
                        <li key={company._id}>
                            <Link to={`/companies/${company._id}`}>
                                {company.name} - {company.industry}
                            </Link>
                        </li>
                    })
                }
            </ul>
        </Fragment>
    )
}