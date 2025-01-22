import type { Meta, StoryObj } from '@storybook/react';

import ErrorMessage from './ErrorMessage';

const meta: Meta<typeof ErrorMessage> = {
    title: 'Components/Atoms/ErrorMessage',
    component: ErrorMessage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
    args: {
        children: '에러메세지',
    },
};
