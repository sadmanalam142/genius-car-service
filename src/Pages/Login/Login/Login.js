import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';
import SocialLogin from '../../../Shared/SocialLogin/SocialLogin';
import axios from 'axios';
import useToken from '../../../CustomHooks/useToken';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(
        auth
    );
    const [token] = useToken(user);

    const location = useLocation();

    let from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();
    let errorMessage;

    if (token) {
        navigate(from, { replace: true });
    }

    if (error) {
        errorMessage = error.message;
    }

    if (loading) {
        return <Loading></Loading>
    }

    const handleEmail = event => {
        setEmail(event.target.value);
    }
    const handlePassword = event => {
        setPassword(event.target.value);
    }
    const handleSubmit = async event => {
        event.preventDefault();
        await signInWithEmailAndPassword(email, password);
    }

    const handleReset = async () => {
        await sendPasswordResetEmail(email);
        toast('Sent email');
    }

    return (
        <div className='w-50 mx-auto mt-5'>
            <h2 className='text-primary text-center'>Please Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control onBlur={handlePassword} type="password" placeholder="Password" required />
                </Form.Group>
                <Button className='w-50 d-block mx-auto' variant="primary" type="submit">
                    Login
                </Button>
                <p className='text-danger'>{errorMessage}</p>
            </Form>
            <p>New to Genious Car? <Link className='pe-auto text-decoration-none text-danger' to="/register">Register please</Link> </p>
            <p>Forgot Password? <button onClick={handleReset} className='btn btn-link pe-auto text-decoration-none text-danger' href=''>Reset Password</button> </p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;