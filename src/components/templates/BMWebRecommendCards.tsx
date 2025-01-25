import { useAuth } from '@/hooks/useAuth';
import useGetBookmarkList from '@/hooks/useGetBookmarkList';
import { WebSiteCard } from '../molecules';
import convertDate from '@/utils/convertDate';

const BMWebRecommendCards = () => {
    const { userInfo } = useAuth();
    const { data } = useGetBookmarkList({
        contentType: 'WEB_RECOMMEND',
        userId: userInfo!.userId,
    });

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            {data?.content?.length ? (
                <>
                    <ul className="grid min-w-[1400px] grid-cols-4 grid-rows-4 gap-6 pt-10">
                        {data.content.map((i) => (
                            <li key={i.id}>
                                <WebSiteCard
                                    title={i.title}
                                    subTitle={convertDate(i.createdAt)}
                                    site={i.url}
                                    id={i.id}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="flex min-h-[200px] w-full items-center justify-center">
                    <p className="text-lg text-gray-500">
                        등록된 추천 사이트가 없습니다.
                    </p>
                </div>
            )}
        </div>
    );
};
export default BMWebRecommendCards;
