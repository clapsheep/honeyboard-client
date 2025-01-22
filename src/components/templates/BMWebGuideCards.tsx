import { useAuth } from '@/hooks/useAuth';
import useGetBookmarkList from '@/hooks/useGetBookmarkList';

const BMWebGuideCards = () => {
    const { userInfo } = useAuth();
    const { data } = useGetBookmarkList({
        contentType: 'WEB_GUIDE',
        userId: userInfo!.userId,
    });
    console.log('called PAGE', data);
    return <div>BMWebGuideCards</div>;
};
export default BMWebGuideCards;
