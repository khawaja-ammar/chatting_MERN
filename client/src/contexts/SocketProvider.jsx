import { useContext, useState, createContext } from 'react';

// import useLocalStorage from '../hooks/useLocalStorage';

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ children }) {
    // const [jwt, setJWT] = useLocalStorage('id');
    // console.log(jwt);
    //AUTHENTICATE FROM SERVER??

    const [socket, setSocket] = useState();
    // TODO: For refreshing a page
    // get new AccessToken if current one is invalid

    // useEffect(() => {}, [auth]);
    return (
        <SocketContext.Provider value={{ socket, setSocket }}>
            {children}
        </SocketContext.Provider>
    );
}
