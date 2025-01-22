import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router';
import AlgoProblemCard from './AlgoProblemCard';

const meta: Meta = {
    title: 'Components/Molecules/AlgoProblemCard',
    component: AlgoProblemCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <BrowserRouter>
                <div className="flex h-[120px] w-[270px] items-center justify-center">
                    <Story />
                </div>
            </BrowserRouter>
        ),
    ],
} satisfies Meta<typeof AlgoProblemCard>;

export default meta;
type Story = StoryObj<typeof AlgoProblemCard>;

export const BOJ: Story = {
    args: {
        title: '백준 1번',
        description: '2024-12-23',
        link: 'https://www.acmicpc.net/problem/1',
        tags: ['DFS', 'BFS', '그래프', 'DP', '시뮬레이션', '브루트포스'],
        id: '1',
    },
};

export const SWEA: Story = {
    args: {
        title: 'SWEA 1번',
        description: '2024-12-23',
        link: 'https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AZND_C7q8SIDFAWB&categoryId=AZND_C7q8SIDFAWB&categoryType=CODE&&&',
        tags: ['DFS', 'BFS', '그래프', 'DP', '시뮬레이션', '브루트포스'],
        id: '1',
    },
};

export const Programmers: Story = {
    args: {
        title: 'Programmers 1번',
        description: '2024-12-23',
        link: 'https://school.programmers.co.kr/learn/courses/30/lessons/3402131',
        tags: ['DFS', 'BFS', '그래프', 'DP', '시뮬레이션', '브루트포스'],
        id: '1',
    },
};

// 태그가 무조건 1개 이상 들어가게 강제할 것
export const WithoutTag: Story = {
    args: {
        title: 'Programmers 1번',
        description: '2024-12-23',
        link: 'https://school.programmers.co.kr/learn/courses/30/lessons/3402131',
        tags: [],
        id: '1',
    },
};
export const WithoutLink: Story = {
    args: {
        title: 'Programmers 1번',
        description: '2024-12-23',
        link: 'https://www.naver.com',
        id: '1',
    },
};
