import { Navigation } from '@/components/organisms';
import { Outlet } from 'react-router';
import PrivateRoute from './PrivateRoute';
import { useUserStore } from '@/stores/userStore';

const MainLayout = () => {
    const { userInfo } = useUserStore();
    return (
        <div className="flex min-h-screen">
            <Navigation
                generation={userInfo!.generationName}
                name={userInfo!.name}
                role={userInfo!.role}
            />

            <main className="flex-1 bg-gray-100 p-8">
                <PrivateRoute isAuthenticated={!!userInfo}>
                    <Outlet />
                </PrivateRoute>
            </main>
        </div>
    );
};

export default MainLayout;
