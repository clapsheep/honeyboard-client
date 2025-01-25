import { getMyBookmarkAPI } from '@/api/mypageAPI';
import { ContentType, BookmarkContent } from '@/types/Bookmark';
import { useSuspenseQuery } from '@tanstack/react-query';

interface useGetBookmarkListProps<T extends ContentType> {
    contentType: T;
    userId: string;
}

const useGetBookmarkList = <T extends ContentType>({
    contentType,
    userId,
}: useGetBookmarkListProps<T>) => {
    const { data } = useSuspenseQuery<{ content: BookmarkContent[T] }>({
        queryKey: ['bookmark', contentType, userId],
        queryFn: () => getMyBookmarkAPI({ contentType }),
    });

    return { data };
};

export default useGetBookmarkList;
