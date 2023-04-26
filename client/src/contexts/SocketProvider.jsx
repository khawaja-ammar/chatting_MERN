import { useContext, createContext } from 'react';
import { io } from 'socket.io-client';

import URL from '../api/serverURL';

import { useAuth } from './AuthProvider';

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ children }) {
    const { auth } = useAuth();

    const socket = io(URL, {
        autoConnect: false,
        auth: {
            user: auth.userID,
            token: auth.accessToken,
        },
    });

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}
