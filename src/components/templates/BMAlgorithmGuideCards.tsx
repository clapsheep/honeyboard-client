import { useAuth } from '@/hooks/useAuth';
import useGetBookmarkList from '@/hooks/useGetBookmarkList';

const BMAlgorithmGuideCards = () => {
    const { userInfo } = useAuth();
    const { data } = useGetBookmarkList({
        contentType: 'ALGO_GUIDE',
        userId: userInfo!.userId,
    });
    console.log('called PAGE', data);
    return <div>BMAlgorithmGuideCards</div>;
};
export default BMAlgorithmGuideCards;
