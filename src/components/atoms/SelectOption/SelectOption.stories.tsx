import type { Meta, StoryObj } from '@storybook/react';
import SelectOption from './SelectOption';
import { SelectOptionType } from '@/services/common/generation';

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

const gisuOptions: SelectOptionType[] = [
    { value: '12', label: '12기' },
    { value: '11', label: '11기' },
];

export const Default: Story = {
    args: {
        id: 'selectGisu',
        name: 'selectGisu',
        options: gisuOptions,
        placeholder: '기수 선택',
        defaultValue: gisuOptions[0].value,
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
            console.log(e.target.value);
        },
    },
};
