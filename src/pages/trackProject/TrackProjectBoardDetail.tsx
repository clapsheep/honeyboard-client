import {
    deleteTrackProjectBoardAPI,
    getTrackProjectBoardDetailAPI,
} from '@/api/trackAPI';
import { Button, ButtonPDF, NameTag } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useAuth } from '@/hooks/useAuth';
import { useProjectBoardDetail } from '@/hooks/useProjectBoardDetail';
import ToastViewerComponent from '@/layouts/ToastViewerComponent';
import { useLocation, useParams } from 'react-router';

const TrackProjectBoardDetail = () => {
    const { pathname } = useLocation();
    const { trackProjectId, trackTeamId, boardId } = useParams();
    const { userInfo } = useAuth();
    const userName = userInfo?.name;

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

    const members = data?.members.sort((a, b) =>
        b.role === 'LEADER' ? 1 : -1,
    );

    const handleDownloadPDF = () => {
        alert('PDF 다운로드');
    };

    if (!data) return null;

    return (
        <>
            <Header
                titleProps={{
                    title: data.title,
                    subTitle: { 'Git 주소': data.url },
                }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        {members!.map((member) => (
                            <NameTag key={member.id} isLeader={member.role}>
                                {member.name}
                            </NameTag>
                        ))}
                        {members!.some((member) => member.name == userName) && (
                            <Button onClick={handleEditTeam}>팀 수정</Button>
                        )}
                    </div>
                    {members!.some((member) => member.name == userName) && (
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
                    viewerId="trackViewer"
                />
            </div>
        </>
    );
};

export default TrackProjectBoardDetail;
