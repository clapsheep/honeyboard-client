import { ChatSection, Header, PlayListSection } from '@/components/organisms';
import { useLocation } from 'react-router';

const PlayList = () => {
    const { pathname } = useLocation();

    return (
        <div className="flex h-full flex-col">
            <Header
                titleProps={{ title: '플레이리스트' }}
                BreadcrumbProps={{ pathname }}
            />
            <div className="mx-auto grid h-[920px] w-[1000px] flex-1 grid-cols-2 items-center gap-6 p-6">
                <PlayListSection />
                <ChatSection />
            </div>
        </div>
    );
};

export default PlayList;
