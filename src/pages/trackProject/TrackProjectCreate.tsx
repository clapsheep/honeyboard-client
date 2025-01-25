import { createTrackProjectAPI } from '@/api/trackAPI';
import { Button } from '@/components/atoms';
import { InputForm } from '@/components/molecules';
import TextAreaForm from '@/components/molecules/TextAreaForm/TextAreaForm';
import { Header } from '@/components/organisms';
import SearchTeamMember from '@/components/organisms/SearchTeamMember/SearchTeamMember';
import { useAuth } from '@/hooks/useAuth';
import { useCreateTrackProject } from '@/hooks/useTrackProject';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

const TrackProjectCreate = () => {
    const MAX_LENGTH = 210;
    const { pathname } = useLocation();
    const { userInfo } = useAuth();

    useEffect(() => {
        if (userInfo?.role != 'ADMIN') {
            navigate(-1);
        }
    });

    const navigate = useNavigate();

    const handleCancle = () => {
        navigate(-1);
    };

    const {
        title,
        objective,
        description,
        weedingMember,
        search,
        searchInput,
        handleTitleInput,
        handleObjectiveInput,
        handleDescriptionInput,
        handleSearchOnChange,
        handleWeedingMember,
        handleSearchOnClick,
    } = useCreateTrackProject();

    const handleForm = async () => {
        const trackData = {
            title: title,
            objective: objective,
            description: description,
            excludedMembers: weedingMember.map((member) => Number(member.id)),
        };

        try {
            const res = await createTrackProjectAPI(trackData);

            if (res.status == 201) {
                navigate(`/project/track/${res.data.id}`);
            } else {
                throw new Error('프로젝트 생성 실패');
            }
        } catch (error) {
            console.error('에러 발생', error);
        }
    };

    return (
        <>
            <Header
                titleProps={{ title: '관통 프로젝트 생성' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end gap-2">
                    <Button onClick={handleForm}>관통 프로젝트 생성</Button>
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

export default TrackProjectCreate;
