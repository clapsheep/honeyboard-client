import { Navigate, Outlet } from 'react-router';
interface PrivateRouteProps {
    isAuthenticated: boolean;
    children: React.ReactNode;
}
const PrivateRoute = ({ isAuthenticated }: PrivateRouteProps) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};

export default PrivateRoute;
