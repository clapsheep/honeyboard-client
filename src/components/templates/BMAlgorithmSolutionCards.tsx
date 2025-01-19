import { useAuth } from '@/hooks/useAuth';
import useGetBookmarkList from '@/hooks/useGetBookmarkList';

const BMAlgorithmSolutionCards = () => {
    const { userInfo } = useAuth();
    const { data } = useGetBookmarkList({
        contentType: 'ALGO_SOLUTION',
        userId: userInfo!.userId,
    });
    console.log('called PAGE', data);
    return <div>BMAlgorithmSolutionCards</div>;
};
export default BMAlgorithmSolutionCards;
