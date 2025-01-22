import { Meta, StoryObj } from '@storybook/react';
import SubmitSection from './SubmitSection';
import { BrowserRouter } from 'react-router';

const meta: Meta = {
    title: 'Components/Organisms/SubmitSection',
    component: SubmitSection,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <BrowserRouter>
                <div className="flex min-w-[800px] items-center justify-center">
                    <Story />
                </div>
            </BrowserRouter>
        ),
    ],
} satisfies Meta<typeof SubmitSection>;

export default meta;
type Story = StoryObj<typeof SubmitSection>;

// 더미데이터
const dummyTeams = [
    {
        id: '1',
        members: [
            {
                id: '1',
                name: '박성문',
                role: 'LEADER' as const,
            },
            {
                id: '2',
                name: '박수양',
                role: 'MEMBER' as const,
            },
        ],
        submitted: true,
        projectBoardId: '1',
    },
    {
        id: '2',
        members: [
            {
                id: '1',
                name: '서주원',
                role: 'LEADER' as const,
            },
            {
                id: '2',
                name: '김종명',
                role: 'MEMBER' as const,
            },
        ],
        submitted: false,
        projectBoardId: null,
    },
    {
        id: '3',
        members: [
            {
                id: '1',
                name: '박성문',
                role: 'LEADER' as const,
            },
            {
                id: '2',
                name: '박수양',
                role: 'MEMBER' as const,
            },
        ],
        submitted: true,
        projectBoardId: '2',
    },
    {
        id: '4',
        members: [
            {
                id: '1',
                name: '박성문',
                role: 'LEADER' as const,
            },
            {
                id: '2',
                name: '박수양',
                role: 'MEMBER' as const,
            },
        ],
        submitted: true,
        projectBoardId: '3',
    },
    {
        id: '5',
        members: [
            {
                id: '1',
                name: '박성문',
                role: 'LEADER' as const,
            },
            {
                id: '2',
                name: '박수양',
                role: 'MEMBER' as const,
            },
        ],
        submitted: true,
        projectBoardId: '4',
    },
    {
        id: '6',
        members: [
            {
                id: '1',
                name: '박성문',
                role: 'LEADER' as const,
            },
            {
                id: '2',
                name: '박수양',
                role: 'MEMBER' as const,
            },
            {
                id: '3',
                name: '박수양',
                role: 'MEMBER' as const,
            },
        ],
        submitted: true,
        projectBoardId: '5',
    },
    {
        id: '7',
        members: [
            {
                id: '1',
                name: '박성문',
                role: 'LEADER' as const,
            },
            {
                id: '2',
                name: '박수양',
                role: 'MEMBER' as const,
            },
            {
                id: '3',
                name: '박수양',
                role: 'MEMBER' as const,
            },
        ],
        submitted: true,
        projectBoardId: '6',
    },
];

const dummyNoTeamUsers = [
    {
        id: '1',
        name: '지유림',
    },
    {
        id: '2',
        name: '강수진',
    },
];

export const Default: Story = {
    args: {
        project: 'track',
        noTeamUsers: dummyNoTeamUsers,
        teams: dummyTeams,
        onClick: (teamId: string) => {
            alert(`선택된 팀 ID: ${teamId}`);
        },
    },
};

export const Finale: Story = {
    args: {
        project: 'final',
        noTeamUsers: dummyNoTeamUsers,
        teams: dummyTeams,
        onClick: (teamId: string) => {
            alert(`선택된 팀 ID: ${teamId}`);
        },
    },
};

export const WithoutTeams: Story = {
    args: {
        project: 'track',
        noTeamUsers: dummyNoTeamUsers,
        teams: [],
        onClick: (teamId: string) => {
            alert(`선택된 팀 ID: ${teamId}`);
        },
    },
};

export const WithoutNoTeamUsers: Story = {
    args: {
        project: 'track',
        noTeamUsers: [],
        teams: dummyTeams,
        onClick: (teamId: string) => {
            alert(`선택된 팀 ID: ${teamId}`);
        },
    },
};
