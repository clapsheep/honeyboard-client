import { SearchBar, WebSiteCard } from '@/components/molecules';
import usePagination from '@/hooks/usePagination';
import { getWebRecommendsAPI } from '@/services/study/web';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Pagination } from '@/components/molecules';

interface WebRecommendCardsProps {
    generationId?: string;
}
// TODO: 북마크 관련 기능 개발
const WebRecommendCards = ({ generationId }: WebRecommendCardsProps) => {
    const {
        handlePageChange,
        currentPage: page,
        sizeState: size,
    } = usePagination({
        size: 16,
    });
    const { data } = useSuspenseQuery({
        queryKey: ['webRecommends', generationId, page, size],
        queryFn: () =>
            getWebRecommendsAPI(generationId || null, page || 1, size || 16),
    });

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <div className="w-[500px]">
                {/* SearchBar 개발 시 수정 */}
                <SearchBar
                    id="webRecommend"
                    label="웹 추천"
                    placeholder="웹 추천 검색"
                    results={[]}
                    onChange={() => {}}
                    onClickResult={() => {}}
                />
            </div>
            {data?.content?.length ? (
                <>
                    <ul className="grid min-w-[1600px] grid-cols-4 grid-rows-4 gap-6">
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
                    <Pagination
                        total={data.pageInfo.totalPages}
                        now={page}
                        onClickLeft={() =>
                            handlePageChange(Math.max(1, page - 5))
                        }
                        onClickRight={() =>
                            handlePageChange(
                                Math.min(data.pageInfo.totalPages, page + 5),
                            )
                        }
                        onClick={(e) =>
                            handlePageChange(Number(e.currentTarget.value))
                        }
                    />
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

export default WebRecommendCards;
