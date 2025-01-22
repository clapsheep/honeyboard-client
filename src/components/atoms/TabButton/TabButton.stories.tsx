import type { Meta, StoryObj } from '@storybook/react';
import TabButton from './TabButton';
import { BrowserRouter } from 'react-router';

const meta = {
    title: 'Components/Atoms/TabButton',
    component: TabButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        ),
    ],
} satisfies Meta<typeof TabButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: 'Active Tab',
        isActive: true,
        path: 'active',
    },
};

export const Inactive: Story = {
    args: {
        name: 'Inactive Tab',
        isActive: false,
        path: 'inactive',
    },
};
