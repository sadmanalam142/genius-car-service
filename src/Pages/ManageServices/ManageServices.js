import React from 'react';
import useServices from '../../CustomHooks/UseServices';

const ManageServices = () => {
    const [services, setServices] = useServices();

    const handleDelete = id => {
        const url = `https://glacial-wildwood-87586.herokuapp.com/service/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const remaining = services.filter(service => service._id !== id);
            setServices(remaining);
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <h1>Manage Services</h1>
            {
                services.map(service => <div key={service._id}>
                    <h6>{service.name} <button onClick={() => handleDelete(service._id)}>X</button></h6>
                </div>)
            }
        </div>
    );
};

export default ManageServices;