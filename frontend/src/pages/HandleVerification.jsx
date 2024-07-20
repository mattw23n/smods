import React, { useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../data/user';
import Loading from './loading';
import queryString from 'query-string';

function HandleVerification() {
    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate();
    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current) return;

        const params = queryString.parse(window.location.search);
        console.log('Query Params:', params);

        const jwt = Array.isArray(params.jwt) ? params.jwt[0] : params.jwt;
        const refreshToken = Array.isArray(params.refreshToken) ? params.refreshToken[0] : params.refreshToken;
        const username = Array.isArray(params.username) ? params.username[0] : params.username;

        console.log('Parsed JWT:', jwt);
        console.log('Parsed Refresh Token:', refreshToken);
        console.log('Parsed Username:', username);

        if (jwt && refreshToken && username) {
            console.log('All tokens present. Logging in user...');
            // Store tokens in localStorage or context
            localStorage.setItem('jwt', jwt);
            localStorage.setItem('refreshToken', refreshToken);
            loginUser({ username, email: username });
            navigate('/'); // Redirect to home page
        } else {
            console.error('Verification failed: Missing tokens');
            navigate('/error'); // Redirect to an error page or handle error gracefully
        }

        effectRan.current = true;
    }, [loginUser, navigate]);

    return <Loading />;
}

export default HandleVerification;