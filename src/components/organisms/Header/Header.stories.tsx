import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router';
import Header from './Header';

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

export const Default: Story = {
    args: {
        BreadcrumbProps: { pathname: '/study/web/concept' },
        titleProps: {
            title: '웹 개발 기초',
            subTitle: {
                subTitle1: 'Web Development Fundamentals',
            },
            description: {
                description1: '웹 개발의 기본 개념을 학습합니다.',
            },
            onClickLike: () => {
                console.log('clicked like');
            },
        },
    },
};

export const WithoutSubtitle: Story = {
    args: {
        BreadcrumbProps: { pathname: '/study/algorithm' },
        titleProps: {
            title: '알고리즘 학습',
            description: {
                description1: '알고리즘 문제 해결 능력을 키웁니다.',
            },
            onClickLike: () => {
                console.log('clicked like');
            },
        },
    },
};
