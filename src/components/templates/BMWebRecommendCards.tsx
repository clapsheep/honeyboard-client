import { useAuth } from '@/hooks/useAuth';
import useGetBookmarkList from '@/hooks/useGetBookmarkList';

const BMWebRecommendCards = () => {
    const { userInfo } = useAuth();
    const { data } = useGetBookmarkList({
        contentType: 'WEB_RECOMMEND',
        userId: userInfo!.userId,
    });
    console.log('called PAGE', data);
    return <div>BMWebRecommendCards</div>;
};
export default BMWebRecommendCards;
