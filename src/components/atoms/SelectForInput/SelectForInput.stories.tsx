import type { Meta, StoryObj } from '@storybook/react';
import SelectForInput from './SelectForInput';

const meta = {
    title: 'Components/Atoms/SelectForInput',
    component: SelectForInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SelectForInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const searchOptions: Record<string | number, string> = {
    '1': '전체',
    '2': '제목',
    '3': '태그',
    '4': '작성자',
};

export const Default: Story = {
    args: {
        id: 'searchOption',
        name: 'searchOption',
        options: searchOptions,
        selectedValue: Object.keys(searchOptions)[1],
        onChange: () => alert('변경 확인'),
    },
};
