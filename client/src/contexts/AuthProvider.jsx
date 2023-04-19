import { useContext, useEffect, useRef, useState, createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    // const [jwt, setJWT] = useLocalStorage('id');
    // console.log(jwt);
    //AUTHENTICATE FROM SERVER??

    // const authRef = useRef(false);
    const [auth, setAuth] = useState(() => {
        return {
            state: false,
            userID: '',
            accessToken: '',
        };
    });
    // TODO: For refreshing a page
    // get new AccessToken if current one is invalid

    useEffect(() => {
        // console.log('');
    }, [auth]);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}
