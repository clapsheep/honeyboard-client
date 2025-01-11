import { getAlgorithmProblemListAPI } from '@/api/algorithmProblemAPI';
import { AlgoProblemCard, Pagination, SearchBar } from '@/components/molecules';
import usePagination from '@/hooks/usePagination';

import { useSuspenseQuery } from '@tanstack/react-query';

const AlgoProblemCards = () => {
    const {
        handlePageChange,
        currentPage: page,
        sizeState: size,
    } = usePagination({
        size: 16,
    });
    const { data } = useSuspenseQuery({
        queryKey: ['algoProblems', page, size],
        queryFn: () => getAlgorithmProblemListAPI(),
    });

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <div className="w-[500px]">
                {/* SearchBar 개발 시 수정 */}
                <SearchBar
                    id="algoProblem"
                    label="알고리즘 문제"
                    placeholder="알고리즘 문제 검색"
                    results={[]}
                    onChange={() => {}}
                    onClickResult={() => {}}
                />
            </div>
            {data?.content?.length ? (
                <>
                    <ul className="grid w-full grid-cols-4 grid-rows-4 gap-6">
                        {data.content.map((item) => (
                            <li key={item.id}>
                                <AlgoProblemCard
                                    id={item.id}
                                    title={item.title}
                                    description={item.updatedAt}
                                    link={item.url}
                                    tags={item.tags.map((tag) => tag.name)}
                                />
                            </li>
                        ))}
                    </ul>
                    <Pagination
                        total={data.pageInfo.totalPages}
                        now={page}
                        onClickLeft={() =>
                            handlePageChange(Math.max(1, page - 1))
                        }
                        onClickRight={() =>
                            handlePageChange(
                                Math.min(data.pageInfo.totalPages, page + 1),
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
                        등록된 알고리즘 문제가 없습니다.
                    </p>
                </div>
            )}
        </div>
    );
};

export default AlgoProblemCards;
