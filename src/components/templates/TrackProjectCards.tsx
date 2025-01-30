import {
    TrackProjectBoard,
    TrackTeam,
    TrackTeamMember,
} from '@/types/TrackProject';
import { ProjectCard } from '../organisms';
import { User } from '@/types/User';

interface TrackProjectCardsProps {
    trackId: string;
    teams: {
        id: TrackTeam['id'];
        members: Pick<TrackTeamMember, 'id' | 'name' | 'role'>[];
        submitted: boolean;
        projectBoardId: string | null;
    }[];
    boards: (Pick<
        TrackProjectBoard,
        'id' | 'title' | 'createdAt' | 'thumbnail'
    > & {
        members: Pick<User, 'id' | 'name'>[];
    })[];
}

const TrackProjectCards = ({
    trackId,
    teams,
    boards,
}: TrackProjectCardsProps) => {
    return (
        <div className="flex w-full flex-col items-center gap-6 p-6">
            {boards && boards.length > 0 ? (
                <ul className="grid w-[1400px] grid-cols-4 grid-rows-2 gap-6 px-6">
                    {boards.map((board) => {
                        const foundTeam = teams.find((team) => {
                            // 팀의 members 배열에서 boards.members.id와 일치하는 항목이 있는지 확인
                            return team.members.some((teamMember) =>
                                board.members.some(
                                    (boardMember) =>
                                        boardMember.id === teamMember.id,
                                ),
                            );
                        });
                        return (
                            <li key={board.id}>
                                <ProjectCard
                                    title={board.title}
                                    subTitle={board.createdAt}
                                    id={board.id}
                                    img={board.thumbnail}
                                    teams={board.members}
                                    pathname={`/project/track/${trackId}/team/${foundTeam?.id}/board`}
                                />
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="flex min-h-[200px] w-full items-center justify-center">
                    <p className="text-lg text-gray-500">
                        등록된 일지가 없습니다.
                    </p>
                </div>
            )}
        </div>
    );
};

export default TrackProjectCards;
