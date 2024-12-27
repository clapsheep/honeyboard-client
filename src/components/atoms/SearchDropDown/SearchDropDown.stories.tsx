import type { Meta, StoryObj } from '@storybook/react';
import SearchDropDown from './SearchDropDown';

const meta = {
    title: 'Components/Atoms/SearchDropDown',
    component: SearchDropDown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SearchDropDown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        results: [
            { id: 1, name: 'dfs' },
            { id: 2, name: 'bfs' },
            { id: 3, name: '다익스트라' },
            { id: 4, name: '문자열' },
            { id: 5, name: 'DP' },
            { id: 6, name: '비트마스킹' },
            { id: 7, name: '프림 알고리즘' },
            { id: 8, name: '이분탐색' },
            { id: 9, name: '세그먼트 트리' },
        ],
        onClick: () => alert('알고리즘 선택'),
    },
};

export const student: Story = {
    args: {
        results: [
            { id: 1, name: '김성문' },
            { id: 2, name: '박성문' },
            { id: 3, name: '이성문' },
        ],
        onClick: () => alert('알고리즘 선택'),
    },
};
