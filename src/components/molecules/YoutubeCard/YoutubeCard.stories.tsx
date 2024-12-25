import { Meta } from '@storybook/react';
import YoutubeCard from './YoutubeCard';
import { fn } from '@storybook/test';

const meta: Meta<typeof YoutubeCard> = {
    title: 'Components/Molecules/YoutubeCard',
    component: YoutubeCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div className="flex h-[251px] w-[327px] items-center justify-center">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof YoutubeCard>;

export default meta;

export const Default = {
    args: {
        thumbnail: 'https://i.ytimg.com/vi/0Lx7KmVWt7s/maxresdefault.jpg', // 16:9
        title: '샘 라이더 (Sam Ryder) - Tiny Riot 가사 번역 라이브 영상',
        channel: '워너뮤직코리아',
        onClick: fn((e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            alert('클릭');
        }),
        onAddClick: fn((e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            alert('추가');
        }),
    },
};
export const Added = {
    args: {
        thumbnail: 'https://i.ytimg.com/vi/0Lx7KmVWt7s/maxresdefault.jpg', // 16:9
        title: '샘 라이더 (Sam Ryder) - Tiny Riot 가사 번역 라이브 영상',
        channel: '워너뮤직코리아',
        isAdded: true,
        onClick: fn((e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            alert('클릭');
        }),
        onAddClick: fn((e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            alert('추가');
        }),
    },
};
