import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { fn } from '@storybook/test';

const meta = {
    title: 'Components/Atoms/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: '버튼',
        color: 'blue',
        onClick: fn(() => alert('default')),
    },
};

export const Disabled: Story = {
    args: {
        children: '비활성화',
        color: 'gray',
        disabled: true,
        onClick: () => alert('작동'),
    },
};
