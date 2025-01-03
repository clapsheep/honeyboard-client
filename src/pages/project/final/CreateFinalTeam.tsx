import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import SearchTeamMember from '@/components/organisms/SearchTeamMember/SearchTeamMember';
import { useFinaleBoard } from '@/hooks/useFinaleBoard';
import { useLocation, useNavigate } from 'react-router';

const CreateTrackProject = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/final');
    };
    const handleCreate = () => {
        console.log('팀 생성');
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
        <div>
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
        </div>
    );
};

export default CreateTrackProject;
