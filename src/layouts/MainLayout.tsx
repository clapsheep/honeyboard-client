import { Navigation } from '@/components/organisms';
import { useAuth } from '@/hooks/useAuth';
import { useGenerationQuery } from '@/hooks/useGeneration';
import { Outlet } from 'react-router';

const MainLayout = () => {
    const { userInfo } = useAuth();
    const { isLoading } = useGenerationQuery();

    // 기수 정보를 가져오는 동안 렌더링 하지 않음 (추후 로딩여부 표시)
    if (isLoading) {
        return null;
    }

    return (
        <div className="flex min-h-screen overflow-hidden">
            <Navigation
                generation={userInfo!.generationName}
                name={userInfo!.name}
                role={userInfo!.role}
            />

            <main className="ml-[240px] flex h-screen flex-1 flex-col overflow-y-auto bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
