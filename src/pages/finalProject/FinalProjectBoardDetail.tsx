import {
    deleteFinaleProjectBoardAPI,
    getFinaleProjectBoardDetailAPI
} from '@/api/finaleAPI';
import { Button, ButtonPDF, NameTag } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useAuth } from '@/hooks/useAuth';
import { useProjectBoardDetail } from '@/hooks/useProjectBoardDetail';
import ToastViewerComponent from '@/layouts/ToastViewerComponent';
import { FinaleTeamMember } from '@/types/FinaleProject';
import { useLocation, useParams } from 'react-router';

//finale
const FinalProjectBoardDetail = () => {

    const { pathname } = useLocation();
    const { finalProjectId, boardId } = useParams();
    const { userInfo } = useAuth();
    const userId = userInfo?.userId;
    const userName = userInfo?.name;

    const { data, handleDelete, handleEdit, handleEditTeam } =
        useProjectBoardDetail({
            projectType: 'final',
            boardId: boardId!,
            requestParam: {
                finalProjectId: finalProjectId!,
                boardId: boardId!,
            },
            getDetailAPI: getFinaleProjectBoardDetailAPI,
            deleteAPI: deleteFinaleProjectBoardAPI,
            navigateAfterDelete: `/project/final/${finalProjectId}`
        });

    const handleDownloadPDF = () => {
        alert('PDF 다운로드');
    };

    if (!data) return null;

    return (
        <>
            <div>팀 프로젝트 게시판 상세</div>

            <Header
            titleProps={{
                title: data.title,
                description: {'요약': data.summary},
            }}
            BreadcrumbProps={{ pathname }}
        >
            <div className="flex justify-between">
                <div className="flex gap-3">
                    {data.members.map(
                        (
                            member: Pick<
                                FinaleTeamMember,
                                'id' | 'name' | 'role'
                            >,
                        ) => (
                            <NameTag key={member.id} isLeader={member.role}>
                                {member.name}
                            </NameTag>
                        ),
                    )}
                </div>
                {data.members.some((member)=> member.name===userName) && (
                    <div className="flex gap-4">
                        <Button onClick={handleDelete} color="red">
                            일지 삭제
                        </Button>
                        <Button onClick={handleEdit}>일지 수정</Button>
                    </div>
                )}
            </div>
        </Header>
        <div className="flex flex-col p-6">
            <div className="flex w-full justify-end">
                <ButtonPDF onClick={handleDownloadPDF}></ButtonPDF>
            </div>
            <ToastViewerComponent
                content={data.content}
                viewerId="finalViewer"
            />
        </div>
        </>
    );
};


export default FinalProjectBoardDetail;
