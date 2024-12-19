import type { Meta, StoryObj } from '@storybook/react';
import SelectOption from './SelectOption';

const meta = {
    title: 'Components/Atoms/SelectOption',
    component: SelectOption,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SelectOption>;

export default meta;
type Story = StoryObj<typeof meta>;

const gisuOptions: Record<string | number, string> = {
    '1': '12기',
    '2': '11기',
};

export const Default: Story = {
    args: {
        id: 'selectedGisu',
        name: 'selectedGisu',
        options: gisuOptions,
        placeholder: '기수 선택',
    },
};
