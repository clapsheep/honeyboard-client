import { createAlgorithmTagAPI, getAlgorithmTagsAPI } from './algorithmAPI';

export const handleTagSearch = async (searchValue: string) => {
    try {
        const data = await getAlgorithmTagsAPI(searchValue);

        return data.map((tag) => ({
            id: tag.id,
            name: tag.name,
        }));
    } catch (error) {
        console.error('알고리즘 태그 검색을 실패했습니다.', error);
        return [];
    }
};

export const handleTagCreate = async (tagName: string) => {
    try {
        const newTag = await createAlgorithmTagAPI({
            id: '',
            name: tagName.trim(),
        });

        return {
            id: newTag.id,
            name: newTag.name,
        };
    } catch (error) {
        console.error('새 태그 생성을 실패했습니다.', error);
        return null;
    }
};
