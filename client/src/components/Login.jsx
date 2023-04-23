import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../contexts/AuthProvider';
import { useSocket } from '../contexts/SocketProvider';

import axios from '../api/axios';
import { io } from 'socket.io-client';
import URL from '../api/serverURL';

const LOGIN_URL = '/auth';

// import { useDarkMode } from '../contexts/DarkModeProvider';

export default function Login() {
    const { setAuth } = useAuth();
    const { setSocket } = useSocket();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('login form sub');
        // communicate with server?
        try {
            const res = await axios.post(
                LOGIN_URL,
                JSON.stringify({
                    user: user,
                    pwd: password,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            console.log('LOGIN RESP: ', res);

            setAuth({
                state: true,
                userID: user,
                accessToken: res.data.accessToken,
            });
            setUser('');
            setPassword('');

            // TODO: CONNECT TO SOCKET
            try {
                const socket = io(URL, {
                    auth: {
                        user: user,
                        token: res.data.accessToken,
                    },
                });
                setSocket(socket);
            } catch (err) {
                console.log('ERROR: ', err);
                setErrMsg('ERROR');
                errRef.current.focus();
            }

            navigate(from, { replace: true });
        } catch (err) {
            console.log('ERROR: ', err);

            setErrMsg('ERROR');

            errRef.current.focus();
        }
    };

    return (
        <section className="flex h-full flex-col justify-center">
            <div className="flex flex-col items-center justify-center gap-1">
                <p
                    ref={errRef}
                    className={errMsg ? '' : 'hidden'}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <span className="text-2xl">LOGIN PAGE</span>
                <form className="flex flex-col gap-1 " onSubmit={handleSubmit}>
                    <label htmlFor="user">User:</label>
                    <input
                        className="input-bordered input input-sm w-80 "
                        id="user"
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                        ref={userRef}
                        autoComplete="off"
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="input-bordered input input-sm w-80"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className="btn-sm btn mb-3 mt-3" type="submit">
                        Login
                    </button>
                </form>
                <p className="flex justify-between gap-10">
                    <span>Need an Account?</span>
                    <span>
                        <Link className="link-primary link" to="/register">
                            Sign Up
                        </Link>
                    </span>
                </p>
            </div>
        </section>
    );
}
