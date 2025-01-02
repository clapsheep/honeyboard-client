import type { Meta, StoryObj } from '@storybook/react';
import StudentEditModal from './StudentEditModal';
import { StudentType } from '@/types/admin/types';

// Meta 타입 정의
const meta: Meta<typeof StudentEditModal> = {
    title: 'Components/Organisms/StudentEditModal',
    component: StudentEditModal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

// Story 타입 정의
type Story = StoryObj<typeof StudentEditModal>;

// 목업 데이터
const mockStudent: StudentType = {
    userId: 1,
    name: '홍길동',
    generationId: 13,
    generationName: '13기',
    email: 'hong@example.com',
    ssafy: true,
};

// 스토리 정의
export const Default: Story = {
    args: {
        isOpen: true,
        student: mockStudent,
    },
};
