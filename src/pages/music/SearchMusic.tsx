import { Header } from '@/components/organisms';
import { useLocation } from 'react-router';

const SearchMusic = () => {
    const { pathname } = useLocation();

    return (
        <>
            <Header
                titleProps={{ title: '음악 검색' }}
                BreadcrumbProps={{ pathname }}
            />
        </>
    );
};

export default SearchMusic;
