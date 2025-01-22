import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta = {
    title: 'Components/Atoms/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        id: 'input',
        placeholder: '이름을 입력하세요.',
    },
};

export const Search: Story = {
    args: {
        id: 'input',
        iconId: 'search',
        placeholder: '이름을 입력하세요.',
    },
};
