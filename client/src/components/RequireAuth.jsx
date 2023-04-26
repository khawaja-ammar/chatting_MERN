import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { SocketProvider } from '../contexts/SocketProvider';

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth.state ? (
        <SocketProvider>
            <Outlet />
        </SocketProvider>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
