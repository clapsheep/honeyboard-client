import { Meta, StoryObj } from '@storybook/react';
import ChatBox from './ChatBox';

const meta = {
    title: 'Components/organisms/ChatBox',
    component: ChatBox,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div className="flex h-[698px] w-[444px]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ChatBox>;

export default meta;

type Story = StoryObj<typeof ChatBox>;

export const Default: Story = {
    args: {
        chatList: [
            {
                id: 13,
                name: 'Bob',
                isMe: false,
                time: '2024-12-28 18:00:00',
                content: "Let's catch up later totot ototo tot otoday.",
            },
            {
                id: 12,
                name: 'Me',
                isMe: true,
                time: '2024-12-28 07:30:00',
                content: 'Morsssssssssssssssss sssssssssning, Alice!',
            },
            {
                id: 11,
                name: 'Alice',
                isMe: false,
                time: '2024-12-28 07:00:00',
                content: 'Morning again!',
            },
            {
                id: 10,
                name: 'Me',
                isMe: true,
                time: '2024-12-27 10:15:00',
                content: 'That sounds great!',
            },
            {
                id: 9,
                name: 'Alice',
                isMe: false,
                time: '2024-12-27 10:00:00',
                content: "I'm planning to finish some work.",
            },
            {
                id: 8,
                name: 'Bob',
                isMe: false,
                time: '2024-12-27 09:30:00',
                content: "What's the plan for today?",
            },
            {
                id: 7,
                name: 'Me',
                isMe: true,
                time: '2024-12-27 09:00:00',
                content: 'Good morning, everyone!',
            },
            {
                id: 6,
                name: 'Alice',
                isMe: false,
                time: '2024-12-27 08:45:00',
                content: 'Good morning, Bob!',
            },
            {
                id: 5,
                name: 'Bob',
                isMe: false,
                time: '2024-12-26 11:30:00',
                content: 'Hello everyone!',
            },
            {
                id: 4,
                name: 'Me',
                isMe: true,
                time: '2024-12-26 10:17:00',
                content: "I'm doing great, thanks!",
            },
            {
                id: 3,
                name: 'Alice',
                isMe: false,
                time: '2024-12-26 10:15:00',
                content: 'How are you today?',
            },
            {
                id: 2,
                name: 'Me',
                isMe: true,
                time: '2024-12-26 09:05:00',
                content: 'Good morning, Alice!',
            },
            {
                id: 1,
                name: 'Alice',
                isMe: false,
                time: '2024-12-26 09:00:00',
                content: 'Good morning!',
            },
        ],
        inputValue: '',
        onInputChange: () => console.log('Input changed'),
        onSendClick: () => console.log('Send clicked'),
    },
};
