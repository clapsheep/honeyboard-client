import type { Meta, StoryObj } from '@storybook/react';
import NavButton from './NavButton';
import Icon from '../Icon/Icon';

const meta = {
    title: 'Components/Atoms/NavButton',
    component: NavButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof NavButton>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const NoSub: Story = {
    args: {
        id: '1',
        title: '메인 페이지',
        icon: <Icon id="calendar" />,
        hasSub: false,
        isActive: false,
        onClick: () => {},
    },
};
