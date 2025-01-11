import { getAlgorithmTagsAPI } from '@/api/AlgorithmTagAPI';
import { TagRequest, TagResponse } from '@/types/Tag';
import { useState } from 'react';

interface useAlgorithmTagProps {
    initialAlgoSearch: [];
}

const useAlgorithmTag = ({ initialAlgoSearch }: useAlgorithmTagProps) => {
    const [value, setValue] = useState('');
    const [algoSearch, setAlgoSearch] =
        useState<TagRequest[]>(initialAlgoSearch);
    const [searchResult, setSearchResult] = useState<TagResponse[]>([]);

    // 알고리즘 태그 검색
    const onAlgorithmChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const searchValue = e.target.value;
        setValue(searchValue);

        try {
            if (searchValue.trim()) {
                const data = await getAlgorithmTagsAPI({ searchValue });
                setSearchResult(data);
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
                    (tag) => tag.name === selectTag.name,
                );

                if (!isDuplicate) {
                    setAlgoSearch((prev) => [
                        ...prev,
                        { name: selectTag.name },
                    ]);
                    setValue('');
                    setSearchResult([]);
                }
            }
        }
    };

    // 엔터키로 알고리즘 태그 추가
    const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value.trim()) {
            e.preventDefault();

            const isDuplicate = algoSearch.some(
                (tag) => tag.name.toLowerCase() === value.toLowerCase(),
            );

            if (!isDuplicate) {
                try {
                    const newTag = value.trim();

                    if (newTag) {
                        setAlgoSearch((prev) => [...prev, { name: newTag }]);
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
        const selectTag = e.currentTarget.textContent;
        if (selectTag) {
            setAlgoSearch((prev) =>
                prev.filter((tag) => tag.name !== selectTag),
            );
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
