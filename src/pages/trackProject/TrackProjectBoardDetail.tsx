import {
    deleteTrackProjectBoardAPI,
    getTrackProjectBoardDetailAPI,
} from '@/api/trackAPI';
import { Button, ButtonPDF, NameTag } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useAuth } from '@/hooks/useAuth';
import { useProjectBoardDetail } from '@/hooks/useProjectBoardDetail';
import ToastViewerComponent from '@/layouts/ToastViewerComponent';
import { TrackTeamMember } from '@/types/TrackProject';
import { useLocation, useParams } from 'react-router';

const TrackProjectBoardDetail = () => {
    const { pathname } = useLocation();
    const { trackProjectId, trackTeamId, boardId } = useParams();
    const { userInfo } = useAuth();
    const userId = userInfo?.userId;

    const { data, handleDelete, handleEdit, handleEditTeam } =
        useProjectBoardDetail({
            projectType: 'track',
            boardId: boardId!,
            requestParam: {
                trackProjectId: trackProjectId!,
                trackTeamId: trackTeamId!,
                boardId: boardId!,
            },
            getDetailAPI: getTrackProjectBoardDetailAPI,
            deleteAPI: deleteTrackProjectBoardAPI,
            navigateAfterDelete: `/project/track/${trackProjectId}`,
            navigateToEditTeam: `/project/track/${trackProjectId}/team/${trackTeamId}/edit`,
        });

    const handleDownloadPDF = () => {
        alert('PDF 다운로드');
    };

    if (!data) return null;

    const response = data.data;

    return (
        <>
            <Header
                titleProps={{
                    title: response.title,
                    subTitle: { 'Git 주소': response.url },
                }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        {response.members.map(
                            (
                                member: Pick<
                                    TrackTeamMember,
                                    'id' | 'name' | 'role'
                                >,
                            ) => (
                                <NameTag key={member.id} isLeader={member.role}>
                                    {member.name}
                                </NameTag>
                            ),
                        )}
                        {response.userId !== userId && (
                            <Button onClick={handleEditTeam}>팀 수정</Button>
                        )}
                    </div>
                    {response.userId !== userId && (
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
                    content={response.content}
                    viewerId="trackViewer"
                />
            </div>
        </>
    );
};

export default TrackProjectBoardDetail;
