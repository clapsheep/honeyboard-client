import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import SubNavButton from './SubNavButton';
import { BrowserRouter } from 'react-router';

const meta = {
    title: 'Components/Atoms/SubNavButton',
    component: SubNavButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story: StoryFn) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        ),
    ],
} satisfies Meta<typeof SubNavButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const on: Story = {
    args: {
        id: 'on',
        title: 'on',
        isActive: true,
        link: '/',
    },
};

export const Default: Story = {
    args: {
        id: 'default',
        title: 'default',
        isActive: false,
        link: '/',
    },
};
