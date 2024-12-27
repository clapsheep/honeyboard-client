import { Meta, StoryObj } from '@storybook/react';
import ChatInput from './ChatInput';
import { fn } from '@storybook/test';

const meta: Meta = {
    title: 'Components/Atoms/ChatInput',
    component: ChatInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => {
            return (
                <div className="w-[412px]">
                    <Story />
                </div>
            );
        },
    ],
} satisfies Meta<typeof ChatInput>;
export default meta;

type Story = StoryObj<typeof ChatInput>;

export const Default: Story = {
    args: {
        id: 'sendChat',
        value: '',
        onChange: fn((e: React.ChangeEvent<HTMLInputElement>) => {
            return e.target.value;
        }),
        onClick: fn(() => alert('작동')),
    },
};
