import type { Meta, StoryObj } from '@storybook/react';
import CalendarTag from './CalendarTag';
import { fn } from '@storybook/test';

const meta = {
    title: 'Components/Atoms/CalendarTag',
    component: CalendarTag,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof CalendarTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Vue 관통',
        onClick: fn(() => alert('작동')),
    },
};
