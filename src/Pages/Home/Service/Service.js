import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Service.css';

const Service = ({service}) => {
    const {_id, name, price, description, img} = service;
    const navigate = useNavigate();
    const navigateServiceDetail = (id) => {
        navigate(`/service/${id}`);
    }
    return (
        <div className='service-container'>
            <img className='w-100' src={img} alt="" />
            <h3>{name}</h3>
            <p>price: ${price}</p>
            <p><small>{description}</small></p>
            <button onClick={() => navigateServiceDetail(_id)} className='bg-primary'>Book: <small>{name}</small></button>
        </div>
    );
};

export default Service;