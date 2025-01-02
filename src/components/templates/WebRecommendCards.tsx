import { WebSiteCard } from '@/components/molecules';
import { getWebRecommendsAPI } from '@/services/study/web';
import { useSuspenseQuery } from '@tanstack/react-query';

interface WebRecommendCardsProps {
    generationId?: string;
    page?: number;
    size?: number;
}
// TODO: 북마크 관련 기능 개발
const WebRecommendCards = ({
    generationId,
    page,
    size,
}: WebRecommendCardsProps) => {
    const { data } = useSuspenseQuery({
        queryKey: ['webConcepts', generationId, page, size],
        queryFn: () =>
            getWebRecommendsAPI(generationId || null, page || 1, size || 16),
    });

    if (!data?.content?.length) {
        return (
            <div className="flex min-h-[200px] w-full items-center justify-center">
                <p className="text-lg text-gray-500">
                    등록된 추천 사이트가 없습니다.
                </p>
            </div>
        );
    }
    console.log(data);

    return (
        <ul className="grid w-full grid-cols-4 gap-6">
            {data.content.map((i) => (
                <li key={i.id}>
                    <WebSiteCard
                        title={i.title}
                        subTitle={i.updatedAt}
                        isBookmarked={false}
                        id={i.id}
                        onBookmarkClick={() => {}}
                    />
                </li>
            ))}
        </ul>
    );
};

export default WebRecommendCards;
