import { create } from 'zustand';
export type UserInfo = {
    userId: string;
    name: string;
    role: string;
    generation: string;
};

interface UserState {
    userInfo: UserInfo | null;
    setUserInfo: (userInfo: UserInfo) => void;
}

export const useUserStore = create<UserState>((set) => ({
    userInfo: null,
    setUserInfo: (userInfo) => set({ userInfo }),
}));
