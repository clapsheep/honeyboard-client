import { useLocation, useNavigate } from 'react-router';
import { BasicModal, Header, SearchTeamMember } from '@/components/organisms';
import { Button } from '@/components/atoms';
import { InputForm } from '../molecules';
import { Result } from '../atoms/SearchDropDown/SearchDropDown';

interface FinaleProjectTeamProps {
    mode: 'create' | 'edit';
    title: string;
    objective: string;
    git: string;
    handleTitleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleObjectiveInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleGitInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
}

const FinaleProjectTeam = ({
    mode,
    title,
    objective,
    git,
    handleTitleInput,
    handleObjectiveInput,
    handleGitInput,
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
}: FinaleProjectTeamProps) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const gitUrlPattern =
        /^(https:\/\/|git@)(?:[\w\d-]+@)?(?:[\w\d\-.]+)[:|/]([\w\d\-/]+)(?:\/([\w\d-]+))?(?:\.git)?$/;
    const MODAL_TEXT = '해당 팀에 본인이 없습니다.';
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
                        {mode === 'create' ? '생성' : '수정'}
                    </Button>
                    <Button onClick={handleCancle} color={'red'}>
                        취소
                    </Button>
                </div>
            </Header>
            <section className="mx-auto mt-11 flex w-[50rem] flex-col gap-3">
                <InputForm
                    id={'projectName'}
                    label={'프로젝트 이름'}
                    placeholder={'프로젝트 명을 작성하세요.'}
                    required={true}
                    type={'text'}
                    value={title}
                    errorMessage={
                        title.trim().length > 0
                            ? ''
                            : '프로젝트 명을 작성하세요!'
                    }
                    onChange={handleTitleInput}
                />
                <InputForm
                    id={'projectGoal'}
                    label={'프로젝트 설명'}
                    placeholder={'프로젝트 설명을 작성하세요. 공백 포함 65자'}
                    required={true}
                    type={'text'}
                    value={objective}
                    errorMessage={
                        objective.trim().length > 0
                            ? ''
                            : '프로젝트 목표를 작성하세요!'
                    }
                    onChange={handleObjectiveInput}
                />
                <InputForm
                    id={'projectGoal'}
                    label={'Git 주소'}
                    placeholder={'Git 주소를 작성하세요.'}
                    required={true}
                    type={'text'}
                    value={git}
                    errorMessage={
                        gitUrlPattern.test(git) ? '' : 'Git주소를 작성하세요!!'
                    }
                    onChange={handleGitInput}
                />
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
                title={MODAL_TEXT}
                onConfirmClick={handleConfirm}
            />
        </>
    );
};

export default FinaleProjectTeam;
