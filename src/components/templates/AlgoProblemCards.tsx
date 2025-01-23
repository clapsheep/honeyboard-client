import { getAlgorithmProblemListAPI } from '@/api/AlgorithmProblemAPI';
import { AlgoProblemCard, Pagination, SearchBar } from '@/components/molecules';
import usePagination from '@/hooks/usePagination';
import { SelectOption } from '../atoms';
import { useState } from 'react';
import debounce from '@/utils/debounce';
import { useSuspenseQuery } from '@tanstack/react-query';
import convertDate from '@/utils/convertDate';

const AlgoProblemCards = () => {
    const {
        handlePageChange,
        currentPage: page,
        sizeState: size,
    } = usePagination({
        size: 16,
    });

    const [searchType, setSearchType] = useState<'tag' | 'title'>('tag');
    const [keyword, setKeyword] = useState('');

    const handleKeyword = debounce((value: string) => {
        setKeyword(value);
    }, 300);

    const { data } = useSuspenseQuery({
        queryKey: ['algoProblems', page, size, searchType, keyword],
        queryFn: () =>
            getAlgorithmProblemListAPI({
                pageRequest: {
                    currentPage: page,
                    pageSize: size,
                },
                searchRequest: {
                    searchType,
                    keyword,
                },
            }),
    });

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <div className="flex w-[566px] gap-1">
                <SelectOption
                    id="searchType"
                    name="searchType"
                    options={[
                        { value: 'tag', label: '태그' },
                        { value: 'title', label: '제목' },
                    ]}
                    placeholder="분류"
                    value={searchType}
                    onChange={(e) => {
                        setSearchType(e.target.value as 'tag' | 'title');
                        handlePageChange(1); // 조건 변경 시 첫 페이지로 이동
                    }}
                />
                <div className="w-full">
                    <SearchBar
                        id="algoProblem"
                        label="알고리즘 문제"
                        placeholder="키워드를 입력하세요"
                        onChange={(e) => handleKeyword(e.target.value)}
                    />
                </div>
            </div>
            {data?.content?.length ? (
                <>
                    <ul className="grid w-full grid-cols-4 grid-rows-4 gap-6">
                        {data.content.map((item) => (
                            <li key={item.id}>
                                <AlgoProblemCard
                                    id={item.id}
                                    title={item.title}
                                    description={convertDate(item.createdAt)}
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
                            handlePageChange(Math.max(1, page - 5))
                        }
                        onClickRight={() =>
                            handlePageChange(
                                Math.min(data.pageInfo.totalPages, page + 5),
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
                        등록된 알고리즘 문제가 없습니다.
                    </p>
                </div>
            )}
        </div>
    );
};

export default AlgoProblemCards;
