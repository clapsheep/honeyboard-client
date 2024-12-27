import { Meta, StoryObj } from '@storybook/react';
import AlgoDetailCard from './AlgoDetailCard';
import { useState } from 'react';

const meta: Meta = {
    title: 'Components/Molecules/AlgoDetailCard',
    component: AlgoDetailCard,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div className="flex w-[327px] items-center justify-center">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof AlgoDetailCard>;
export default meta;

type Story = StoryObj<typeof AlgoDetailCard>;

type AlgoDetailCardHooksProps = {
    title: string;
    subTitle: string;
    memory: number;
    time: number;
    language: string;
    isBookmarked: boolean;
};

const AlgoDetailCardWithHooks = (args: AlgoDetailCardHooksProps) => {
    const [isBookmarked, setIsBookmarked] = useState(args.isBookmarked);

    return (
        <AlgoDetailCard
            title={args.title}
            subTitle={args.subTitle}
            memory={args.memory}
            time={args.time}
            language={args.language}
            isBookmarked={isBookmarked}
            onClick={() => alert('작동')}
            onBookmarkClick={() => setIsBookmarked(!isBookmarked)}
        />
    );
};

export const Default: Story = {
    args: {
        title: '박성문의 비트마스킹을 이용한 풀이',
        subTitle: '박성문',
        memory: 19396,
        time: 125,
        language: 'java',
        isBookmarked: true,
    },
    render: (args) => (
        <AlgoDetailCardWithHooks
            title={args.title}
            subTitle={args.subTitle}
            memory={args.memory}
            time={args.time}
            language={args.language}
            isBookmarked={args.isBookmarked}
        />
    ),
};
