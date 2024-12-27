import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className="flex min-h-screen">
            {/* Left Navigation */}
            <nav className="w-64 bg-gray-800 p-4 text-white">Navigation</nav>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
