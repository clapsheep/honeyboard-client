import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import SearchTeamMember from '@/components/organisms/SearchTeamMember/SearchTeamMember';
import { useAuth } from '@/hooks/useAuth';
import { useFinaleBoard } from '@/hooks/useFinaleBoard';
import { createFinaleTeamAPI } from '@/services/project/finale/finaleAPI';
import { useLocation, useNavigate } from 'react-router';

const CreateTrackProject = () => {
    // 유저 정보
    const { userInfo } = useAuth();

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/final');
    };

    const handleCreate = async () => {
        if (userInfo?.generationId === undefined) {
            return;
        }

        const teamData = {
            projectName: '파이널 프로젝트',
            summary: '요약',
            generationId: Number(userInfo.generationId),
            leaderId: Number(teamLeader[0].id),
            memberIds: teamMember.map((member) => Number(member.id)),
        };

        try {
            const res = await createFinaleTeamAPI(teamData);

            if (res.status === 200) {
                navigate('/final');
            }
            return;
        } catch (error) {
            console.error('Create Team falied: ', error);
            throw new Error('팀 생성에 실패했습니다.');
        }
    };

    const {
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
    } = useFinaleBoard();

    return (
        <>
            <Header
                titleProps={{ title: '팀 생성' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleCreate}>팀 생성</Button>
                    </div>
                </div>
            </Header>
            <section className="mx-auto mt-11 flex w-[50rem] flex-col gap-3">
                <SearchTeamMember
                    title={'팀장'}
                    team={teamLeader}
                    results={leaderSearch}
                    inputValue={leaderInputValue}
                    onClickResult={handleLeaderSearch}
                    onChange={handleLeaderOnChange}
                    onClick={handleTeamLeader}
                />
                <SearchTeamMember
                    title={'팀원'}
                    team={teamMember}
                    results={memberSearch}
                    inputValue={memberInputValue}
                    onClickResult={handleMemeberSearch}
                    onChange={handleMemeberOnChange}
                    onClick={handleTeamMemeber}
                />
            </section>
        </>
    );
};

export default CreateTrackProject;
