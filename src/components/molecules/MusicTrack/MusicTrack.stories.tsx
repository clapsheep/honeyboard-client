import { Meta, StoryObj } from '@storybook/react';
import MusicTrack from './MusicTrack';
import { fn } from '@storybook/test';

const meta: Meta = {
    title: 'Components/Molecules/MusicTrack',
    component: MusicTrack,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => {
            return (
                <div className="flex w-[415px] items-center justify-center">
                    <Story />
                </div>
            );
        },
    ],
} satisfies Meta<typeof MusicTrack>;
export default meta;

type Story = StoryObj<typeof MusicTrack>;

export const Default: Story = {
    args: {
        title: 'Love Me Do - Mono / Remastered',
        channel: 'TheBeatles',
        onClick: fn(() => alert('작동')),
        onDelete: fn(() => alert('삭제')),
    },
};
