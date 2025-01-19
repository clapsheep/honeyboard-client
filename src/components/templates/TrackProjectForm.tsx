import ToastEditorComponent from '@/layouts/ToastEditorComponent';
import { InputForm } from '../molecules';
import { Header } from '../organisms';
import { TrackTeamMember } from '@/types/TrackProject';
import { Button, NameTag } from '../atoms';

interface TrackProjectFormProps {
    mode: 'create' | 'edit';
    pathname: string;
    members: Pick<TrackTeamMember, 'id' | 'name' | 'role'>[];
    title: string;
    url: string;
    handleCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editorRef: React.RefObject<HTMLDivElement>;
}

const TrackProjectForm = ({
    mode,
    pathname,
    members,
    title,
    url,
    handleCancel,
    handleSubmit,
    handleTitleChange,
    handleUrlChange,
    editorRef,
}: TrackProjectFormProps) => {
    return (
        <>
            <Header
                titleProps={{
                    title: mode === 'create' ? '일지 작성' : '일지 수정',
                }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        {members.map((member) => (
                            <NameTag isLeader={member.role}>
                                {member.name}
                            </NameTag>
                        ))}
                        {members.length > 0 ? <Button>팀 수정</Button> : <></>}
                    </div>
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
                    id="trackProjectTitle"
                    label="프로젝트 제목"
                    placeholder="프로젝트 명을 입력하세요"
                    required={true}
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    errorMessage={!title ? '프로젝트 명을 작성하세요' : ''}
                />
                <InputForm
                    id="trackProjectUrl"
                    label="Git 주소"
                    placeholder="Git 주소를 입력하세요"
                    required={true}
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                    errorMessage={!url ? '사이트를 작성하세요' : ''}
                />
                <ToastEditorComponent
                    editorId="trackProjectEditor"
                    editorRef={editorRef}
                />
            </div>
        </>
    );
};

export default TrackProjectForm;
