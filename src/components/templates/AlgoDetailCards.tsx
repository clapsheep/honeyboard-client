import { useAuth } from '@/hooks/useAuth.ts';
import { getAlgorithmSolutionListAPI } from '@/api/AlgorithmSolutionAPI';
import { AlgoDetailCard, Pagination, FilterChip } from '@/components/molecules';
import usePagination from '@/hooks/usePagination';
import { SelectOption } from '../atoms';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface AlgoDetailCardsProps {
    problemId: string;
}

const AlgoDetailCards = ({ problemId }: AlgoDetailCardsProps) => {
    const { userInfo } = useAuth();
    const {
        handlePageChange,
        currentPage: page,
        sizeState: size,
    } = usePagination({
        size: 9,
    });

    const languageOptions = ['java', 'cpp', 'python'];
    const [selectedFilters, setSelectedFilters] = useState<
        Record<string, string[]>
    >({
        language: [...languageOptions],
    });

    const [generationId, setGenerationId] = useState<string | null>(null);

    const [sortType, setSortType] = useState<'memory' | 'runtime' | 'latest'>(
        'latest',
    );

    const handleGenerationClick = () => {
        setGenerationId((prev) =>
            prev ? null : userInfo?.generationId || null,
        );
    };

    const handleFilterClick = (category: string, value: string) => {
        setSelectedFilters((prevFilters) => {
            const currentValues = prevFilters[category] || [];
            const updatedValues = currentValues.includes(value)
                ? currentValues.filter((v) => v !== value)
                : [...currentValues, value];
            return { ...prevFilters, [category]: updatedValues };
        });
    };

    const { data } = useSuspenseQuery({
        queryKey: [
            'algoSolutions',
            problemId,
            page,
            size,
            sortType,
            selectedFilters,
            generationId,
        ],
        queryFn: () =>
            getAlgorithmSolutionListAPI(
                { problemId },
                {
                    pageRequest: {
                        currentPage: page,
                        pageSize: size,
                    },
                    searchRequest: {
                        sortType,
                        language: selectedFilters.language?.join(','),
                        generationId: generationId || undefined,
                    },
                },
            ),
    });

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-between w-full py-2 my-3 border border-gray-200 bg-gray-25 px-9">
                <FilterChip
                    optionGroups={[
                        {
                            category: 'language',
                            options: [
                                { value: 'java', label: 'Java' },
                                { value: 'cpp', label: 'C++' },
                                { value: 'python', label: 'Python' },
                            ],
                        },
                    ]}
                    selectedValues={selectedFilters}
                    onClickOption={handleFilterClick}
                    generationId={generationId}
                    onGenerationClick={handleGenerationClick}
                />
                <SelectOption
                    id="sortType"
                    name="sortType"
                    options={[
                        { value: 'latest', label: '최신순' },
                        { value: 'memory', label: '메모리' },
                        { value: 'runtime', label: '시간' },
                    ]}
                    placeholder="정렬"
                    value={sortType}
                    onChange={(e) => {
                        setSortType(
                            e.target.value as 'memory' | 'runtime' | 'latest',
                        );
                        handlePageChange(1);
                    }}
                    disableBorder={true}
                />
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-6 p-6">
                {data?.content?.length ? (
                    <>
                        <ul className="grid w-full grid-cols-3 grid-rows-3 gap-6">
                            {data.content.map((item) => (
                                <li key={item.id}>
                                    <AlgoDetailCard
                                        problemId={problemId}
                                        solutionId={item.id}
                                        title={item.title}
                                        subTitle={item.subtitle}
                                        memory={Number(item.memory)}
                                        time={Number(item.runtime)}
                                        language={item.languageName}
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
                                    Math.min(
                                        data.pageInfo.totalPages,
                                        page + 5,
                                    ),
                                )
                            }
                            onClick={(e) =>
                                handlePageChange(Number(e.currentTarget.textContent))
                            }
                        />
                    </>
                ) : (
                    <div className="flex min-h-[200px] w-full items-center justify-center">
                        <p className="text-lg text-gray-500">
                            등록된 알고리즘 풀이가 없습니다.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlgoDetailCards;
