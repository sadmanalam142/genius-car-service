import React from 'react';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../CustomHooks/useToken';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const [signInWithGithub, gitUser, gitLoading, gitError] = useSignInWithGithub(auth);
    const [token] = useToken(user || gitUser);

    const navigate = useNavigate();
    let errorMessage;
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    if (token) {
        navigate(from, { replace: true })
    }
    if (error || gitError) {
        errorMessage = error?.message;
    }
    if(loading || gitLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <p className='text-danger'>{errorMessage}</p>
            <div className='d-flex justifu-content-center align-items-center'>
                <div style={{ height: '2px' }} className='bg-primary w-50'></div>
                <p className='px-2 mt-2'>or</p>
                <div style={{ height: '2px' }} className='bg-primary w-50'></div>
            </div>
            <button onClick={() => signInWithGoogle()} className='bg-primary text-white rounded d-block mx-auto'>Sing in with Google</button>
            <button onClick={() => signInWithGithub()} className='bg-primary text-white rounded d-block mx-auto my-2'>Sing in with Github</button>
            <button className='bg-primary text-white rounded d-block mx-auto'>Sing in with Facebook</button>
        </div>
    );
};

export default SocialLogin;