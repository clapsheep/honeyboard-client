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
type Story = StoryObj<typeof meta>;

export const NoSub: Story = {
    args: {
        id: '1',
        title: '메인 페이지',
        icon: <Icon id="calendar" />,
        hasSub: false,
        isActive: false,
        link: '/main',
        onClick: () => {
            alert('하위 메뉴 열기!');
        },
    },
};

export const HasSub: Story = {
    args: {
        id: '1',
        title: '메인 페이지',
        icon: <Icon id="calendar" />,
        hasSub: true,
        isActive: false,
        onClick: () => {},
    },
};
