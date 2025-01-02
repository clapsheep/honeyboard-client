import { GenerationType } from '@/services/common/generation/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface GenerationStateType {
    generationList: GenerationType[];
    setGenerationList: (generationList: GenerationType[]) => void;
}

// persist 제거하고 메모리에서만 관리
export const useGenerationStore = create<GenerationStateType>()(
    devtools(
        (set) => ({
            generationList: [],
            setGenerationList: (generationList: GenerationType[]) =>
                set({ generationList }),
        }),
        {
            name: 'Generation Store',
        },
    ),
);
