import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ModalStateType {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    modalProps: {
        title: string;
        icon?: string;
        subTitle?: string;
        onConfirmClick?: () => void;
        onDeleteClick?: () => void;
        onCancelClick: () => void;
    } | null;
    openModal: (props: ModalStateType['modalProps']) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalStateType>()(
    devtools((set) => ({
        isOpen: false,
        modalProps: null,
        setIsOpen: (isOpen: boolean) => set({ isOpen }),
        openModal: (props) => set({ isOpen: true, modalProps: props }),
        closeModal: () => set({ isOpen: false, modalProps: null }),
    })),
);
