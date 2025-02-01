import { BasicModal, Header } from '@/components/organisms';
import { useLocation, useNavigate } from 'react-router';
import { Button } from '@/components/atoms';
import { SearchTeamMember } from '@/components/organisms';
import { Result } from '../atoms/SearchDropDown/SearchDropDown';

interface TrackProjectTeamProps {
    mode: 'create' | 'edit';
    contain: boolean;
    teamLeader: Result[];
    leaderInputValue: string;
    leaderSearch: Result[];
    handleTeamLeader: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleLeaderSearch: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleLeaderOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    teamMember: Result[];
    memberInputValue: string;
    memberSearch: Result[];
    handleTeamMember: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleMemberSearch: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleMemberOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAPIButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalText: string;
}

const TrackProjectTeam = ({
    mode,
    teamLeader,
    leaderInputValue,
    leaderSearch,
    handleTeamLeader,
    handleLeaderSearch,
    handleLeaderOnChange,
    teamMember,
    memberInputValue,
    memberSearch,
    handleTeamMember,
    handleMemberSearch,
    handleMemberOnChange,
    handleAPIButton,
    modalOpen,
    setModalOpen,
    modalText,
}: TrackProjectTeamProps) => {
    const { pathname } = useLocation();

    const navigate = useNavigate();

    const handleConfirm = () => {
        setModalOpen(false);
    };

    const handleCancle = () => {
        navigate(-1);
    };

    return (
        <>
            <Header
                titleProps={{
                    title: mode === 'create' ? '팀 생성' : '팀 수정',
                }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end gap-4">
                    <Button onClick={handleAPIButton}>
                        {mode === 'create' ? '팀 생성' : '팀 수정'}
                    </Button>
                    <Button onClick={handleCancle} color={'red'}>
                        취소
                    </Button>
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
                    onClickResult={handleMemberSearch}
                    onChange={handleMemberOnChange}
                    onClick={handleTeamMember}
                />
            </section>
            <BasicModal
                isOpen={modalOpen}
                title={modalText}
                onConfirmClick={handleConfirm}
            />
        </>
    );
};

export default TrackProjectTeam;
