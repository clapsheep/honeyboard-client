import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import Navigation from './Navigation';
import { BrowserRouter } from 'react-router';

const meta = {
    title: 'Components/Organisms/Navigation',
    component: Navigation,
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
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        role: 'user',
        generation: '12',
        name: '박성문',
    },
};
