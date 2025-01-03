import { Meta, StoryObj } from '@storybook/react';
import SearchTeamMember from './SearchTeamMember';

const meta: Meta<typeof SearchTeamMember> = {
    component: SearchTeamMember,
    title: 'Components/Organisms/SearchTeamMember',
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SearchTeamMember>;

export default meta;

type Story = StoryObj<typeof SearchTeamMember>;

export const Default: Story = {
    args: {
        title: '팀장',
        team: [
            { id: '1', name: '박성문' },
            { id: '1', name: '박성문' },
            { id: '1', name: '박성문' },
        ],
        results: [
            { id: '1', name: '박성문' },
            { id: '1', name: '박성문' },
            { id: '1', name: '박성문' },
        ],
        onClickResult: () => {},
        onClickSearch: () => {},
        onChange: () => {},
        onClick: () => {},
    },
};
