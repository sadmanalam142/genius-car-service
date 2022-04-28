import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useServiceDetail from '../../CustomHooks/UseServiceDetail';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);

    const navigate = useNavigate();
    const navigateCheckout = () => {
        navigate(`/checkout/${serviceId}`);
    }
    return (
        <div>
            <h2>You are about to book: {service.name}</h2>
            <div className='text-center'>
                <button onClick={navigateCheckout} className='bg-primary text-white'>Procced Payment</button>
            </div>
        </div>
    );
};

export default ServiceDetail;