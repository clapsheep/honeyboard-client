import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default PrivateRoute;
