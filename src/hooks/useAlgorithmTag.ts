import { Result } from '@/components/atoms/SearchDropDown/SearchDropDown';
import {
    handleTagCreate,
    handleTagSearch,
} from '@/services/study/algorithm/algorithmService';
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
                const result = await handleTagSearch(searchValue);
                setSearchResult(result);
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
                    const newTag = await handleTagCreate(value);

                    if (newTag) {
                        setAlgoSearch((prev) => [
                            ...prev,
                            {
                                id: newTag.id,
                                name: newTag.name,
                            },
                        ]);
                    }

                    setValue('');
                    setSearchResult([]);
                } catch (error) {
                    console.error('새 태그 생성을 실패했습니다.', error);
                }
            }
        }
    };

    const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        const tagId = e.currentTarget.dataset.id;
        if (tagId) {
            setAlgoSearch((prev) => prev.filter((tag) => tag.id !== tagId));
        }
    };

    return {
        onAlgorithmChange,
        onClickResult,
        onKeyDown,
        onDelete,
        value,
        algoSearch,
        searchResult,
    };
};

export default useAlgorithmTag;
