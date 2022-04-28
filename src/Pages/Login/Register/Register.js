import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';
import auth from '../../../firebase.init';
import SocialLogin from '../../../Shared/SocialLogin/SocialLogin';
import { async } from '@firebase/util';
import Loading from '../../../Shared/Loading/Loading';
import useToken from '../../../CustomHooks/useToken';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState(false);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [token] = useToken(user);

    const navigate = useNavigate();

    if (token) {
        navigate('/home');
    }

    if (loading) {
        return <Loading></Loading>
    }

    const handleChecked = event => {
        setAgree(event.target.checked);
    }

    const handleName = event => {
        setName(event.target.value);
    }
    const handleEmail = event => {
        setEmail(event.target.value);
    }
    const handlePassword = event => {
        setPassword(event.target.value);
    }
    const handleSubmit = async event => {
        event.preventDefault();
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
        alert('Updated profile');
    }
    return (
        <div className='register-container mt-3'>
            <h2 className='text-center text-primary'>Please Register</h2>
            <form onSubmit={handleSubmit}>
                <input onBlur={handleName} type="text" name="name" id="" placeholder='Your Name' />
                <input onBlur={handleEmail} type="email" name="email" id="" placeholder='Your Email' required />
                <input type="password" name="password" id="" placeholder='Your Password' required />
                <input onClick={handleChecked} type="checkbox" name="terms" id="terms" />
                <label className={`ps-2 ${agree ? 'text-primary' : 'text-danger'}`} htmlFor="terms">Accept Genious Car terms and condition</label>
                <input disabled={!agree} className='bg-primary w-50 d-block mx-auto text-white rounded' onBlur={handlePassword} type="submit" value="Register" />
            </form>
            <p>Already have an account? <Link className='pe-auto text-decoration-none text-danger' to="/login">Login please</Link> </p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;