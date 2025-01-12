import { GenerationType, SelectOptionType } from '@/types/common';

export const convertSelectType = (
    generationList: GenerationType[],
): SelectOptionType[] => {
    return generationList.map((generation) => ({
        value: generation.id,
        label: generation.name + '기',
    }));
};
