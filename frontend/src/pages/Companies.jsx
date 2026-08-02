import { Fragment } from "react";
import { useForm } from "react-hook-form";

export default function Companies() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <Fragment>
            <h2>Companies</h2>
            <form action="submit">

                <label htmlFor="name">Enter company name</label>
                <input id='name' type="text" placeholder="Name"
                {...register("name", {required: true})}/>

                <label htmlFor="Industry">Enter Industry</label>
                <input id="Industry" type="text" placeholder="Industry name"
                {...register("Industry", {required: true})}/>

                <label htmlFor="Website">Enter website</label>
                <input id="Website" type="text" placeholder="Website"
                {...register("Website", {required: true})} />

                <button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? 'Adding...' : 'Add Company' }
                </button>
            </form>

            <ul>
                <li>
                    <button></button>
                </li>
            </ul>
        </Fragment>
    )
}