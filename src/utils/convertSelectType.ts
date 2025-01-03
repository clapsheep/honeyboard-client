import {
    GenerationType,
    SelectOptionType,
} from '@/services/common/generation/types';

export const convertSelectType = (
    generationList: GenerationType[],
): SelectOptionType[] => {
    return generationList.map((generation) => ({
        value: generation.id,
        label: generation.name + '기',
    }));
};
