import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import TeamTag from './TeamTag';

const meta = {
    title: 'Components/Molecules/TeamTag',
    component: TeamTag,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TeamTag>;

export default meta;
type Story = StoryObj<typeof TeamTag>;

// 임시 데이터
const mockTeam = [
    { id: 1, name: '박성문', role: 'leader' as const },
    { id: 2, name: '김성문', role: 'member' as const },
    { id: 3, name: '이성문', role: 'member' as const },
];

export const Default: Story = {
    args: {
        team: mockTeam,
        onClick: fn(() => console.log('TeamTag clicked')),
    },
};
