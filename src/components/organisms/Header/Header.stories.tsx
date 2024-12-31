import { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import { BrowserRouter } from 'react-router';

const meta: Meta<typeof Header> = {
    component: Header,
    title: 'Components/Organisms/Header',
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <BrowserRouter>
                <div className="w-full">
                    <Story />
                </div>
            </BrowserRouter>
        ),
    ],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;
const ROUTES = [
    {
        path: '/',
        name: '프로젝트',
        isActive: true,

        children: [
            {
                path: '/알고리즘/개념',
                name: '개념',
                isActive: false,
            },
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
            {
                path: '/알고리즘/개념',
                name: '개념',
                isActive: false,
            },
            {
                path: '/알고리즘/문제풀이',
                name: '문제풀이',
                isActive: false,
            },
        ],
    },
];

export const Default: Story = {
    args: {
        BreadcrumbProps: {
            routes: ROUTES,
        },
        titleProps: {
            title: 'Header',
            subTitle: {
                subTitle1: 'subTitle1',
            },
            description: {
                description1: 'description1',
            },
            onClickLike: () => {
                console.log('clicked');
            },
        },
    },
};
