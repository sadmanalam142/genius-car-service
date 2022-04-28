import React from 'react';
import { Placeholder } from 'react-bootstrap';
import { useForm } from "react-hook-form";

const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const url = `https://glacial-wildwood-87586.herokuapp.com/services`
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
        })
    };
    return (
        <div className='w-50 mx-auto'>
            <form className='d-flex flex-column mt-5' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-2' Placeholder='name' {...register("name", { required: true, maxLength: 20 })} />

                <textarea className='mb-2' Placeholder='description' {...register("description")} />

                <input className='mb-2' Placeholder='price' type="number" {...register("price")} />

                <input className='mb-2' Placeholder='photo url' type="text" {...register("img")} />

                <input className='mb-2' type="submit" value='Add Service' />
            </form>
        </div>
    );
};

export default AddService;