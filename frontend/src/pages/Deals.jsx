import { Link } from "react-router-dom";
import { useAllDeals, useCreateDeal } from "../hooks/useDeals";
import { useForm } from "react-hook-form";
import { Fragment } from "react";
import { useMutation } from "@tanstack/react-query";

export const Deals = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    return (
        <Fragment>
            <h2>Deals</h2>
            <form>
                <label htmlFor="title">Enter deal title</label>
                <input id="title" type="text" placeholder="title"
                    {...register("title"), { required: true }} />
                    {errors.title && <p>{errors.title}</p>}

                <label htmlFor="value">Enter value</label>
                <input id="value" type="text" placeholder="value"
                    {...register("value"), { required: true }} />
                    {errors.value && <p>{errors.value}</p>}


                <label htmlFor="stage">Enter stage</label>
                <input id="stage" type="text" placeholder="stage"
                    {...register("stagef"), { required: true }} />
                    {errors.stage && <p>{errors.stage}</p>}

                <button></button>
            </form>
        </Fragment>
    )
}