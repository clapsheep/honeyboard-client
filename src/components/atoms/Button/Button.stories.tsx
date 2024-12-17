import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

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
        onClick: () => alert('작동'),
    },
};

export const Disabled: Story = {
    args: {
        children: '버튼',
        color: 'gray',
        disabled: true,
        onClick: () => alert('작동'),
    },
};
