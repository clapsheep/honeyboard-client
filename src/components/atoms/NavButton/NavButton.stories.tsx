import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import NavButton from './NavButton';
import Icon from '../Icon/Icon';
import { BrowserRouter } from 'react-router';

const meta = {
    title: 'Components/Atoms/NavButton',
    component: NavButton,
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
} satisfies Meta<typeof NavButton>;

export default meta;
type Story = StoryObj<typeof NavButton>;

export const HasSub: Story = {
    args: {
        id: '1',
        title: '메인 페이지',
        icon: <Icon id="calendar" />,
        isActive: false,
        link: '/main',
        items: [
            { id: '1', title: '메인페이지', isActive: false, link: '/home' },
        ],
        onClick: () => {
            alert('하위 메뉴 열기!');
        },
    },
};

export const NoSub: Story = {
    args: {
        id: '1',
        title: '메인 페이지',
        icon: <Icon id="calendar" />,
        isActive: false,
    },
};

export const Logout: Story = {
    args: {
        id: '1',
        title: '로그아웃',
        icon: <Icon id="circle-close-red" />,
        items: [
            { id: '1', title: '메인페이지', isActive: false, link: '/home' },
        ],
        isActive: false,
        onClick: () => {
            alert('로그아웃');
        },
        color: 'text-error-500',
    },
};
