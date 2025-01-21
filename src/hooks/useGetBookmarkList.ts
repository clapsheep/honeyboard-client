import { getMyBookmarkAPI } from '@/api/mypageAPI';
import { ContentType } from '@/types/Bookmark';
import { useSuspenseQuery } from '@tanstack/react-query';

interface useGetBookmarkListProps {
    contentType: ContentType;
    userId: string;
}
const useGetBookmarkList = ({
    contentType,
    userId,
}: useGetBookmarkListProps) => {
    const { data } = useSuspenseQuery({
        queryKey: ['bookmark', contentType, userId],
        queryFn: () => getMyBookmarkAPI({ contentType }),
    });

    return { data };
};
export default useGetBookmarkList;
