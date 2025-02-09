import { useLocation, useNavigate } from 'react-router';
import { Result } from '../atoms/SearchDropDown/SearchDropDown';
import { Header, SearchTeamMember } from '@/components/organisms';
import { Button } from '@/components/atoms';
import { InputForm, TextAreaForm } from '@/components/molecules';

interface TrackProjectProps {
    mode: 'create' | 'edit';
    title: string;
    objective: string;
    description: string;
    handleTitleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleObjectiveInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    weedingMember: Result[];
    search: Result[];
    searchInput: string;
    handleWeedingMember: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleSearchOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleForm: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TrackProject = ({
    mode,
    title,
    objective,
    description,
    handleTitleInput,
    handleObjectiveInput,
    handleDescriptionInput,
    weedingMember,
    search,
    searchInput,
    handleWeedingMember,
    handleSearchOnClick,
    handleSearchOnChange,
    handleForm,
}: TrackProjectProps) => {
    const MAX_LENGTH = 210;

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const handleCancle = () => {
        navigate(-1);
    };

    return (
        <>
            <Header
                titleProps={{
                    title:
                        mode === 'create'
                            ? '관통 프로젝트 생성'
                            : '관통 프로젝트 수정',
                }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end gap-2">
                    <Button onClick={handleForm}>
                        {mode === 'create' ? '프로젝트 생성' : '프로젝트 수정'}
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
                    label={'프로젝트 목표'}
                    placeholder={'프로젝트 목표를 작성하세요. 공백 포함 65자'}
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
                <TextAreaForm
                    id={'projectDesc'}
                    label={'프로젝트 설명'}
                    placeholder={
                        '프로젝트 설명을 작성하세요. 공백 포함 210자 이하'
                    }
                    textValue={description}
                    maxLength={MAX_LENGTH}
                    onChange={handleDescriptionInput}
                />
                <SearchTeamMember
                    title={'제외 인원'}
                    team={weedingMember}
                    results={search}
                    inputValue={searchInput}
                    onClickResult={handleSearchOnClick}
                    onChange={handleSearchOnChange}
                    onClick={handleWeedingMember}
                />
            </section>
        </>
    );
};

export default TrackProject;
