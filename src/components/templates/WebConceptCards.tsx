import { getWebGuideListAPI } from '@/api/WebGuideAPI';
import { Pagination, SearchBar } from '@/components/molecules';
import { ProjectCard } from '@/components/organisms';
import usePagination from '@/hooks/usePagination';
import convertDate from '@/utils/convertDate';
import debounce from '@/utils/debounce';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation } from 'react-router';

interface WebConceptCardsProps {
    generationId?: string | null;
}

const WebConceptCards = ({ generationId }: WebConceptCardsProps) => {
    const { pathname } = useLocation();
    const {
        handlePageChange,
        currentPage: page,
        sizeState: size,
    } = usePagination({
        size: 8,
    });
    const [searchTitle, setSearchTitle] = useState('');
    const handleSearchTitle = debounce(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTitle(e.target.value);
        },
        300,
    );
    const { data } = useSuspenseQuery({
        queryKey: ['webConcepts', generationId, page, size, searchTitle],
        queryFn: () =>
            getWebGuideListAPI({
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
                    id="webConcept"
                    label="웹 개념"
                    placeholder="웹 개념 검색"
                    onChange={handleSearchTitle}
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
                        등록된 컨셉 프로젝트가 없습니다.
                    </p>
                </div>
            )}
        </div>
    );
};

export default WebConceptCards;
