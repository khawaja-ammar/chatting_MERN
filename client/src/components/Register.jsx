import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const REGISTER_URL = '/register';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// FIXME:
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX = /^.{3,24}$/;

const svgTick = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
        />
    </svg>
);

const svgCross = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

export default function Login() {
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        setErrMsg('');
    }, [user, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const check1 = USER_REGEX.test(user);
        const check2 = PWD_REGEX.test(password);

        if (!check1 || !check2) {
            setErrMsg('Invalid Entry');
            return;
        }

        // communicate with server
        try {
            const res = await axios.post(
                REGISTER_URL,
                JSON.stringify({
                    user: user,
                    pwd: password,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            console.log('RESP: ', res);

            setUser('');
            setPassword('');

            navigate('/login');
        } catch (err) {
            console.log('ERROR: ', err);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
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
                <span className="text-2xl">REGISTER NOW</span>
                <form className="flex flex-col gap-1 " onSubmit={handleSubmit}>
                    <label htmlFor="user" className="flex">
                        <span>Username:</span>
                        <span
                            className={validName ? 'text-green-700' : 'hidden'}
                        >
                            {svgTick}
                        </span>
                        <span
                            className={
                                validName || !user ? 'hidden' : 'text-red-600'
                            }
                        >
                            {svgCross}
                        </span>
                    </label>
                    <input
                        className="input-bordered input input-sm w-80"
                        id="user"
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                        ref={userRef}
                        autoComplete="off"
                        aria-invalid={validName ? 'false' : 'true'}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p
                        id="uidnote"
                        className={
                            userFocus && user && !validName
                                ? 'relative -bottom-3 mb-3 w-80 rounded-lg bg-black p-1 text-sm text-white'
                                : 'hidden'
                        }
                    >
                        4 to 24 characters.
                        <br />
                        Must begin with a letter.
                        <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    <label htmlFor="password" className="flex">
                        <span>Password:</span>
                        <span
                            className={
                                validPassword ? 'text-green-700' : 'hidden'
                            }
                        >
                            {svgTick}
                        </span>
                        <span
                            className={
                                validPassword || !password
                                    ? 'hidden'
                                    : 'text-red-600'
                            }
                        >
                            {svgCross}
                        </span>
                    </label>
                    <input
                        className="input-bordered input input-sm w-80"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-invalid={validPassword ? 'false' : 'true'}
                        aria-describedby="passwordnote"
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    <p
                        id="passwordnote"
                        className={
                            passwordFocus && !validPassword
                                ? 'relative -bottom-3 mb-3 w-80 rounded-lg bg-black p-1 text-sm text-white'
                                : 'hidden'
                        }
                    >
                        8 to 24 characters.
                        <br />
                        Must include uppercase and lowercase letters, a number
                        and a special character.
                        <br />
                        Allowed special characters: Allowed special characters:{' '}
                        <span aria-label="exclamation mark">!</span>{' '}
                        <span aria-label="at symbol">@</span>{' '}
                        <span aria-label="hashtag">#</span>{' '}
                        <span aria-label="dollar sign">$</span>{' '}
                        <span aria-label="percent">%</span>
                    </p>

                    <button className="btn-sm btn mb-3 mt-3" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </section>
    );
}
