import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router';
import NavMenu from './NavMenu';

const meta = {
    title: 'Components/Molecules/NavMenu',
    component: NavMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story: StoryFn) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        ),
    ],
} satisfies Meta<typeof NavMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        userRole: 'ADMIN',
        menus: [
            {
                name: '메인페이지',
                path: '/',
                icon: 'calendar',
            },
            {
                name: '프로젝트',
                path: '/project',
                icon: 'document',
                children: [
                    {
                        name: '관통프로젝트',
                        path: '/project/track',
                    },
                    {
                        name: '파이널프로젝트',
                        path: '/project/final',
                    },
                ],
            },
            {
                name: '학습',
                path: '/study',
                icon: 'pen',
                children: [
                    {
                        name: '알고리즘',
                        path: '/study/algorithm',
                    },
                    {
                        name: '웹',
                        path: '/study/web',
                    },
                ],
            },
            {
                name: '음악',
                path: '/music',
                icon: 'music',
            },
            {
                name: '미니게임',
                path: '/game',
                icon: 'ball',
            },
            {
                name: '학생관리',
                path: '/student',
                icon: 'edit-user',
            },
        ],
    },
};
