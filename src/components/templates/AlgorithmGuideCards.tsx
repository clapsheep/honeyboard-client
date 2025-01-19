import { useLocation } from 'react-router';
import { Pagination, SearchBar } from '@/components/molecules';
import { ProjectCard } from '@/components/organisms';
import usePagination from '@/hooks/usePagination';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getAlgorithmGuideListAPI } from '@/api/AlgorithmGuideAPI.ts';
import convertDate from '@/utils/convertDate';
import debounce from '@/utils/debounce';

interface AlgorithmGuideCardsProps {
    generationId?: string | null;
}

const AlgorithmGuideCards = ({ generationId }: AlgorithmGuideCardsProps) => {
    const { pathname } = useLocation();
    console.log(pathname);
    const {
        handlePageChange,
        currentPage: page,
        sizeState: size,
    } = usePagination({
        size: 8,
    });
    const [searchTitle, setSearchTitle] = useState('');
    const handleSearchTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(e.target.value);
    };
    const { data } = useSuspenseQuery({
        queryKey: ['AlgorithmGuides', generationId, page, size, searchTitle],
        queryFn: () =>
            getAlgorithmGuideListAPI({
                generationId,
                pageRequest: {
                    currentPage: page,
                    pageSize: size,
                },
                searchRequest: searchTitle
                    ? { searchType: 'title', keyword: searchTitle }
                    : undefined, // searchTitle이 없을 경우 생략
            }),
    });

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <div className="w-[500px]">
                {/* SearchBar 개발 시 수정 */}
                <SearchBar
                    id="AlgorithmGuide"
                    label="알고리즘 개념"
                    placeholder="알고리즘 개념 검색"
                    results={[]}
                    onChange={debounce(handleSearchTitle, 300)}
                    onClickResult={() => {}}
                />
            </div>
            {data?.content?.length ? (
                <>
                    <ul className="grid min-w-[1400px] grid-cols-4 grid-rows-2 gap-6">
                        {data.content.map((item) => (
                            <li key={item.id}>
                                <ProjectCard
                                    title={item.title}
                                    subTitle={convertDate(item.createdAt)}
                                    id={item.id}
                                    img={item.thumbnail}
                                    pathname={pathname}
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
                        등록된 알고리즘 개념이 없습니다.
                    </p>
                </div>
            )}
        </div>
    );
};

export default AlgorithmGuideCards;
