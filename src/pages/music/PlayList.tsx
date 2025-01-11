import { Header } from '@/components/organisms';
import { useLocation } from 'react-router';

const PlayList = () => {
    const { pathname } = useLocation();

    return (
        <>
            <Header
                titleProps={{ title: '플레이리스트' }}
                BreadcrumbProps={{ pathname }}
            />
        </>
    );
};

export default PlayList;
