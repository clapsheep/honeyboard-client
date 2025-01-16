import { TrackTeam, TrackTeamMember } from '@/types/TrackProject';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Team {
    id: TrackTeam['id'];
    members: Pick<TrackTeamMember, 'id' | 'name' | 'role'>[];
    submitted: boolean;
    projectBoardId: string | null;
}

// 더미데이터
const mockTeams: Team[] = [
    {
        id: '1',
        members: [
            { id: '1', name: '김철수', role: 'LEADER' },
            { id: '2', name: '이영희', role: 'MEMBER' },
            { id: '3', name: '박지훈', role: 'MEMBER' },
        ],
        submitted: false,
        projectBoardId: null,
    },
    {
        id: '2',
        members: [
            { id: '4', name: '최민지', role: 'LEADER' },
            { id: '5', name: '정현우', role: 'MEMBER' },
            { id: '6', name: '강서연', role: 'MEMBER' },
        ],
        submitted: true,
        projectBoardId: '1',
    },
    {
        id: '3',
        members: [
            { id: '7', name: '윤준호', role: 'LEADER' },
            { id: '8', name: '송민아', role: 'MEMBER' },
            { id: '9', name: '임도현', role: 'MEMBER' },
        ],
        submitted: false,
        projectBoardId: null,
    },
];

export interface TeamStoreType {
    teams: Team[];
    setTeams: (teams: Team[]) => void;
}

export const useTeamStore = create<TeamStoreType>()(
    devtools(
        (set) => ({
            teams: mockTeams,
            setTeams: (teams: Team[]) => set({ teams }),
        }),
        {
            name: 'Teams Store',
        },
    ),
);
