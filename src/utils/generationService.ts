import { useGenerationStore } from '@/stores/generationStore';

// 전역 상태에서 기수 이름 조회하는 유틸리티 함수
export const getGenerationName = (generationId: number) => {
    const generationList = useGenerationStore.getState().generationList;
    const generation = generationList.find(
        (generation) => generation.id === generationId,
    );
    return generation ? generation.name + '기' : '';
};
