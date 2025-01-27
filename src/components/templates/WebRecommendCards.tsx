import { Pagination, SearchBar, WebSiteCard } from '@/components/molecules';
import usePagination from '@/hooks/usePagination';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getWebRecommendListAPI } from '@/api/WebRecommendAPI';
import { useState } from 'react';
import convertDate from '@/utils/convertDate';
import debounce from '@/utils/debounce';

interface WebRecommendCardsProps {
    generationId?: string | null;
}

const WebRecommendCards = ({ generationId }: WebRecommendCardsProps) => {
    const {
        handlePageChange,
        currentPage: page,
        sizeState: size,
    } = usePagination({
        size: 16,
    });
    const [searchTitle, setSearchTitle] = useState('');
    const handleSearchTitle = debounce(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTitle(e.target.value);
        },
        300,
    );
    const { data } = useSuspenseQuery({
        queryKey: ['webRecommends', generationId, page, size, searchTitle],
        queryFn: () =>
            getWebRecommendListAPI({
                generationId,
                pageRequest: {
                    currentPage: page,
                    pageSize: size,
                },
                searchTitle,
            }),
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
                    onChange={handleSearchTitle}
                    onClickResult={() => {}}
                />
            </div>
            {data?.content?.length ? (
                <>
                    <ul className="grid min-w-[1400px] grid-cols-4 grid-rows-4 gap-6">
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
                            handlePageChange(
                                Number(e.currentTarget.textContent),
                            )
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
