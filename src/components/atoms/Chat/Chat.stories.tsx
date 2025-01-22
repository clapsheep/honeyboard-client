import { Meta, StoryObj } from '@storybook/react';
import Chat from './Chat';

const meta = {
    title: 'Components/atoms/Chat',
    component: Chat,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Chat>;

export default meta;

type Story = StoryObj<typeof Chat>;

export const SentMessage: Story = {
    args: {
        children: 'Hello!',
        isMe: true,
        time: '12:30 PM',
        name: 'John',
    },
};

export const ReceivedMessage: Story = {
    args: {
        children: 'How are you?',
        isMe: false,
        time: '12:31 PM',
        name: 'Alice',
    },
};
