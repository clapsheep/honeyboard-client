import type { Meta, StoryObj } from '@storybook/react';
import SocialLoginButton from './SocialLoginButton';
import { fn } from '@storybook/test';

const meta = {
    title: 'Components/Atoms/SocialLoginButton',
    component: SocialLoginButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SocialLoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        type: 'google',
        onClick: fn(() => alert('로그인')),
    },
};

export const Naver: Story = {
    args: {
        type: 'naver',
        onClick: fn(() => alert('로그인')),
    },
};
