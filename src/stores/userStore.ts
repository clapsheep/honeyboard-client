import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export interface UserInfo {
    userId: string;
    name: string;
    role: string;
    generationId: string;
    generationName: string;
}

export interface UserStoreType {
    userInfo: UserInfo | null;
    setUserInfo: (userInfo: UserInfo | null) => void;
}

export const useUserStore = create<UserStoreType>()(
    devtools(
        persist(
            (set) => ({
                userInfo: null,
                setUserInfo: (userInfo) => set({ userInfo }),
            }),
            {
                name: 'user-storage',
            },
        ),
        {
            name: 'User Store',
        },
    ),
);
