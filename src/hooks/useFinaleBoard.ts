import { Result } from '@/components/atoms/SearchDropDown/SearchDropDown';
import { getFinaleRemainingMemberAPI } from '@/services/project/finale/finaleAPI';
import { TeamUser } from '@/types/project/finale';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

interface DatasetType extends DOMStringMap {
    id: string;
    name: string;
}

export const useFinaleBoard = () => {
    // 유저 정보
    const { userInfo } = useAuth();

    // 팀원이 정해지지 않은 유저를 받아오는 useQuery 함수
    const { data: response } = useQuery<AxiosResponse<TeamUser[]>, Error>({
        queryKey: ['remained-users', userInfo?.generationId],
        queryFn: () => getFinaleRemainingMemberAPI(userInfo?.generationId),
    });

    // 팀장 관리에 대한 상태
    const [teamLeader, setTeamLeader] = useState<Result[]>([]);
    const [leaderInputValue, setLeaderInputValue] = useState<string>('');
    const [leaderSearch, setLeaderSearch] = useState<Result[]>([]);

    // 팀원 관리에 대한 상태
    const [teamMember, setTeamMember] = useState<Result[]>([]);
    const [memberInputValue, setMemberInputValue] = useState<string>('');
    const [memberSearch, setMemberSearch] = useState<Result[]>([]);

    // TeamLeader에 대한 검색어 관련 useEffect
    useEffect(() => {
        if (!response?.data) {
            return;
        }

        const processed = response.data.map((user) => ({
            id: user.userId.toString(),
            name: user.name,
        }));

        const filteredSearch = processed.filter((user) => {
            const isInTeamLeader = teamLeader.some(
                (leader) => leader.id === user.id,
            );
            const isInTeamMember = teamMember.some(
                (member) => member.id === user.id,
            );

            if (leaderInputValue === '') {
                return false;
            }

            return (
                !isInTeamLeader &&
                !isInTeamMember &&
                user.name.includes(leaderInputValue)
            );
        });

        setLeaderSearch(filteredSearch);
    }, [response?.data, leaderInputValue, teamLeader, teamMember]);

    // TeamLeader에 대한 검색어 관련 useEffect
    useEffect(() => {
        if (!response?.data) {
            return;
        }

        const processed = response.data.map((user) => ({
            id: user.userId.toString(),
            name: user.name,
        }));

        const filteredSearch = processed.filter((user) => {
            const isInTeamLeader = teamLeader.some(
                (leader) => leader.id === user.id,
            );
            const isInTeamMember = teamMember.some(
                (member) => member.id === user.id,
            );

            if (memberInputValue === '') {
                return false;
            }

            return (
                !isInTeamLeader &&
                !isInTeamMember &&
                user.name.includes(memberInputValue)
            );
        });

        setMemberSearch(filteredSearch);
    }, [response?.data, memberInputValue, teamLeader, teamMember]);

    // 팀장 검색창의 onChange 함수
    const handleLeaderOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLeaderInputValue(e.target.value);
    };

    // 검색창에서 인원을 선택하는 click 함수
    const handleLeaderSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget as HTMLButtonElement & {
            dataset: DatasetType;
        };
        const memberId = button.dataset.id;
        const memberName = button.dataset.name;

        setLeaderInputValue('');

        setTeamLeader([{ id: memberId, name: memberName }]);
    };

    // 선택한 팀장에서 제외시키는 click 함수
    const handleTeamLeader = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget as HTMLButtonElement & {
            dataset: DatasetType;
        };
        const memberId = button.dataset.id;

        setTeamLeader(teamLeader.filter((item) => item.id !== memberId));
    };

    // 팀원 검색창의 onChange 함수
    const handleMemeberOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMemberInputValue(e.target.value);
    };

    // 팀원 관리에 대한 이벤트 함수
    const handleTeamMemeber = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const memberId = button.dataset.id;

        setTeamMember(teamMember.filter((item) => item.id !== memberId));
    };

    // 검색창에서 인원을 선택하는 click 함수
    const handleMemeberSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget as HTMLButtonElement & {
            dataset: DatasetType;
        };
        const memberId = button.dataset.id;
        const memberName = button.dataset.name;

        setMemberInputValue('');

        setTeamMember([...teamMember, { id: memberId, name: memberName }]);
    };
    return {
        teamLeader,
        leaderInputValue,
        leaderSearch,
        handleTeamLeader,
        handleLeaderSearch,
        handleLeaderOnChange,
        teamMember,
        memberInputValue,
        memberSearch,
        handleTeamMemeber,
        handleMemeberSearch,
        handleMemeberOnChange,
    };
};
