import type { Meta, StoryObj } from '@storybook/react';
import TabButton from './TabButton';

const meta = {
    title: 'Components/Atoms/TabButton',
    component: TabButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TabButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: 'Active Tab',
        isActive: true,
        onClick: () => alert('Active tab 클릭'),
    },
};

export const Inactive: Story = {
    args: {
        name: 'Inactive Tab',
        isActive: false,
        onClick: () => alert('Inactive tab 클릭'),
    },
};
