import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useServiceDetail from '../../CustomHooks/UseServiceDetail';
import auth from '../../firebase.init';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);

    const handleOrders = event => {
        event.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        axios.post('https://glacial-wildwood-87586.herokuapp.com/orders', order)
        .then(response => {
            const {data} = response;
            if(data.insertedId){
                toast('Your order is done');
                event.target.reset();
            }
        })
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Order: <span className='text-primary'>{service.name}</span></h2>
            <form onSubmit={handleOrders}>
                <input className='w-100 mb-2' type="text" value={user?.displayName} name="name" id="" placeholder='Name' readOnly />
                <br />
                <input className='w-100 mb-2' type="email" value={user?.email} name="email" id="" placeholder='Email' readOnly />
                <br />
                <input className='w-100 mb-2' type="text" value={service.name} name="name" id="" placeholder='' readOnly />
                <br />
                <input className='w-100 mb-2' type="text" name="address" id="" placeholder='Address' />
                <br />
                <input className='w-100 mb-2' type="text" name="phone" id="" placeholder='Number' />
                <br />
                <input className='w-50 d-block mx-auto bg-primary text-white' type="submit" value="Order Done" />
            </form>
        </div>
    );
};

export default Checkout;