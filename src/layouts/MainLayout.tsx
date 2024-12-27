import { Navigation } from '@/components/organisms';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className="flex min-h-screen">
            {/* Left Navigation */}
            <Navigation generation="12" name="박성문" role="admin" />

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
