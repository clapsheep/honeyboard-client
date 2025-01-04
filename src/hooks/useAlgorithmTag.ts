import { Result } from '@/components/atoms/SearchDropDown/SearchDropDown';
import {
    createAlgorithmTagAPI,
    getAlgorithmTagsAPI,
} from '@/services/study/algorithm';
import { useState } from 'react';

interface useAlgorithmTagProps {
    initialAlgoSearch: Result[];
}

const useAlgorithmTag = ({ initialAlgoSearch }: useAlgorithmTagProps) => {
    const [value, setValue] = useState('');
    const [algoSearch, setAlgoSearch] = useState<Result[]>(initialAlgoSearch);
    const [searchResult, setSearchResult] = useState<Result[]>([]);

    // 알고리즘 태그 검색
    const onAlgorithmChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const searchValue = e.target.value;
        setValue(searchValue);

        try {
            if (searchValue.trim()) {
                const data = await getAlgorithmTagsAPI(searchValue);

                const formattedResults: Result[] = data.map((tag) => ({
                    id: tag.id.toString(),
                    name: tag.name,
                }));

                setSearchResult(formattedResults);
            } else {
                setSearchResult([]);
            }
        } catch (error) {
            console.error('알고리즘 태그 검색을 실패했습니다.', error);
            setSearchResult([]);
        }
    };

    // 알고리즘 태그 검색 결과 선택
    const onClickResult = (e: React.MouseEvent<HTMLButtonElement>) => {
        const searchTag = e.currentTarget.textContent;

        if (searchTag) {
            const selectTag = searchResult.find(
                (tag) => tag.name.toLowerCase() === searchTag.toLowerCase(),
            );

            if (selectTag) {
                const isDuplicate = algoSearch.some(
                    (item) => item.id === selectTag.id,
                );

                if (!isDuplicate) {
                    setAlgoSearch((prev) => [...prev, selectTag]);
                    setValue('');
                    setSearchResult([]);
                }
            }
        }
    };

    // 알고리즘 태그 추가
    const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value.trim()) {
            e.preventDefault();

            const isExist = searchResult.find(
                (tag) => tag.name.toLowerCase() === value.toLowerCase(),
            );

            const isDuplicate = algoSearch.some(
                (item) => item.name.toLowerCase() === value.toLowerCase(),
            );

            // 새로운 태그 db에 추가
            if (!isExist && !isDuplicate) {
                try {
                    const newTag = await createAlgorithmTagAPI({
                        id: '',
                        name: value.trim(),
                    });

                    setAlgoSearch((prev) => [
                        ...prev,
                        {
                            id: newTag.id,
                            name: newTag.name,
                        },
                    ]);

                    setValue('');
                    setSearchResult([]);
                } catch (error) {
                    console.error('새 태그 생성을 실패했습니다.', error);
                }
            }
        }
    };
    return {
        onAlgorithmChange,
        onClickResult,
        onKeyDown,
        value,
        algoSearch,
        searchResult,
    };
};

export default useAlgorithmTag;
