import ToastEditorComponent from '@/layouts/ToastEditorComponent';
import { InputForm } from '../molecules';
import { Header } from '../organisms';
import { TrackTeamMember } from '@/types/TrackProject';
import { Button, NameTag } from '../atoms';

interface ProjectBoardFormProps {
    mode: 'create' | 'edit';
    project: 'track' | 'final';
    pathname: string;
    members?: Pick<TrackTeamMember, 'id' | 'name' | 'role'>[];
    title: string;
    subTitle: string;
    handleCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editorRef: React.RefObject<HTMLDivElement>;
}

const ProjectBoardForm = ({
    mode,
    project,
    pathname,
    members,
    title,
    subTitle,
    handleCancel,
    handleSubmit,
    handleTitleChange,
    handleSubTitleChange,
    editorRef,
}: ProjectBoardFormProps) => {
    return (
        <>
            <Header
                titleProps={{
                    title: mode === 'create' ? '일지 작성' : '일지 수정',
                }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    {members ? (
                        <div className="flex gap-3">
                            {members.map((member) => (
                                <NameTag isLeader={member.role}>
                                    {member.name}
                                </NameTag>
                            ))}
                            {members.length > 0 ? (
                                <Button>팀 수정</Button>
                            ) : (
                                <></>
                            )}
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleSubmit}>
                            {mode === 'create' ? '일지 작성' : '일지 수정'}
                        </Button>
                    </div>
                </div>
            </Header>
            <div className="flex flex-1 flex-col gap-4 p-6">
                <InputForm
                    id="projectBoardTitle"
                    label="프로젝트 제목"
                    placeholder="프로젝트 명을 입력하세요"
                    required={true}
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    errorMessage={!title ? '프로젝트 명을 작성하세요' : ''}
                />
                <InputForm
                    id="projectBoardSubTitle"
                    label={project === 'track' ? 'Git 주소' : '요약'}
                    placeholder={
                        project === 'track'
                            ? 'Git 주소를 입력하세요'
                            : '간단하게 진행 상황을 작성하세요.'
                    }
                    required={true}
                    type="text"
                    value={subTitle}
                    onChange={handleSubTitleChange}
                    errorMessage={
                        project === 'track' && !subTitle
                            ? '사이트를 작성하세요'
                            : '진행 상황을 작성하세요'
                    }
                />
                <ToastEditorComponent
                    editorId="projectBoardEditor"
                    editorRef={editorRef}
                />
            </div>
        </>
    );
};

export default ProjectBoardForm;
