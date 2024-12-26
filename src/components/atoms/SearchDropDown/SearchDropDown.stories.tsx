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
            { id: 3, name: 'dfs' },
            { id: 2, name: 'bfs' },
            { id: 3, name: '다익스트라' },
        ],
        onClick: () => alert('알고리즘 선택'),
    },
};
