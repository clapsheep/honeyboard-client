import type { Meta, StoryObj } from '@storybook/react';
import SubNavButton from './SubNavButton';

const meta = {
    title: 'Components/Atoms/SubNavButton',
    component: SubNavButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SubNavButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const on: Story = {
    args: {
        id: 'on',
        title: 'on',
        isActive: true,
        onClick: () => alert('on'),
    },
};

export const Default: Story = {
    args: {
        id: 'default',
        title: 'default',
        isActive: false,
        onClick: () => alert('default'),
    },
};
