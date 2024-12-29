import type { Meta, StoryObj } from '@storybook/react';
import StudentList from './StudentList';

const meta = {
    title: 'Components/organisms/StudentList',
    component: StudentList,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof StudentList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        students: [
            {
                name: '김철수',
                gisu: 12,
                email: 'kimchulsoo@example.com',
                isMember: true,
            },
            {
                name: '김철',
                gisu: 12,
                email: 'chul@example.com',
                isMember: true,
            },
            {
                name: '박민수',
                gisu: 12,
                email: 'mins@naver.com',
                isMember: false,
            },
            {
                name: '박성문',
                gisu: 12,
                email: 'sevenknights@ssafy.com',
                isMember: true,
            },
        ],
        onEdit: (student) => {
            alert(`수정 버튼 클릭: ${student.name} 정보 수정`);
        },
    },
};
