import {
    deleteFinaleProjectBoardAPI,
    getFinaleProjectBoardDetailAPI,
} from '@/api/finaleAPI';
import { Button, ButtonPDF, NameTag } from '@/components/atoms';
import { Header } from '@/components/organisms';
import FinalPDF from '@/components/templates/PDF/FinalPDF';
import { useAuth } from '@/hooks/useAuth';
import { useProjectBoardDetail } from '@/hooks/useProjectBoardDetail';
import ToastViewerComponent from '@/layouts/ToastViewerComponent';
import { FinaleTeamMember } from '@/types/FinaleProject';
import convertDate from '@/utils/convertDate';
import { useLocation, useParams } from 'react-router';

const FinalProjectBoardDetail = () => {
    const { pathname } = useLocation();
    const { finaleProjectId, boardId } = useParams();
    const { userInfo } = useAuth();
    const userId = userInfo?.userId;

    const { data, handleDelete, handleEdit } = useProjectBoardDetail({
        projectType: 'final',
        boardId: boardId!,
        requestParam: {
            finaleProjectId: finaleProjectId!,
            boardId: boardId!,
        },
        getDetailAPI: getFinaleProjectBoardDetailAPI,
        deleteAPI: deleteFinaleProjectBoardAPI,
        navigateAfterDelete: `/project/final/${finaleProjectId}`,
    });

    if (!data) return null;

    return (
        <>
            <Header
                titleProps={{
                    title: data.title,
                    description: { 요약: data.summary },
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
                    {(userInfo?.role === 'ADMIN' ||
                        data.members.some(
                            (member) => member.id === userId,
                        )) && (
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
                    <ButtonPDF
                        document={<FinalPDF data={data} />}
                        fileName={`[FINAL_${convertDate(data.createdAt)}]${data.members.map((i) => i.name).join(',')}_${data.title}.pdf`}
                    />
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
