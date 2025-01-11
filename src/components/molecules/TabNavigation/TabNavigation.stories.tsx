import { Meta, StoryObj } from '@storybook/react';
import TabNavigation from './TabNavigation';
import { MemoryRouter } from 'react-router';

const meta: Meta<typeof TabNavigation> = {
    component: TabNavigation,
    title: 'Components/Molecules/TabNavigation',
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
    tags: ['autodocs'],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        routes: [
            {
                path: '/',
                name: '프로젝트',
                isActive: true,

                children: [
                    { path: '/알고리즘/개념', name: '개념', isActive: false },
                    {
                        path: '/알고리즘/문제풀이',
                        name: '문제풀이',
                        isActive: true,
                    },
                ],
            },
            {
                path: '/about',
                name: '알고리즘',
                isActive: false,
                children: [
                    { path: '/알고리즘/개념', name: '개념', isActive: false },
                    {
                        path: '/알고리즘/문제풀이',
                        name: '문제풀이',
                        isActive: false,
                    },
                ],
            },
        ],
    },
    parameters: {
        actions: {
            handles: ['click'],
        },
    },
};

export default meta;
