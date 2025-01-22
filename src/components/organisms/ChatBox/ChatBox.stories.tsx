import { Meta, StoryObj } from '@storybook/react';
import ChatBox from './ChatBox';

const meta = {
    title: 'Components/Organisms/ChatBox',
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
        ],
        inputValue: '',
        onInputChange: () => console.log('Input changed'),
        onSendClick: () => console.log('Send clicked'),
    },
};
