import { NameTag } from '@/components/atoms';
import { TeamTag } from '@/components/molecules';
import { TrackTeam, TrackTeamMember } from '@/types/TrackProject';
import { User } from '@/types/User';

interface SubmitSectionProps {
    project: 'track' | 'final';
    noTeamUsers?: Pick<User, 'id' | 'name'>[];
    teams?: {
        id: TrackTeam['id'];
        members: Pick<TrackTeamMember, 'id' | 'name' | 'role'>[];
        submitted: boolean;
        projectBoardId: string | null;
    }[];
    onClick: (teamId: string) => void;
}

const SubmitSection = ({
    project,
    noTeamUsers,
    teams,
    onClick,
}: SubmitSectionProps) => {
    return (
        <div className="flex w-full flex-col gap-2 rounded border border-gray-300 bg-gray-25 px-4 pb-4 pt-3 shadow-md">
            <div className="text-text-xl font-semibold text-gray-900">
                {project === 'track' ? '제출 현황' : '오늘의 제출 현황'}
            </div>
            <div className="flex flex-wrap items-center justify-start gap-2">
                {teams && teams.length > 0
                    ? teams.map((team, index) => (
                          <div key={index}>
                              <TeamTag
                                  team={team.members}
                                  isSubmit={team.submitted}
                                  onClick={() => onClick(team.id)}
                              />
                          </div>
                      ))
                    : null}
                {noTeamUsers && noTeamUsers.length > 0
                    ? noTeamUsers.map((member) => (
                          <div key={member.id}>
                              <NameTag isLeader={null} color="gray">
                                  {member.name}
                              </NameTag>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
};

export default SubmitSection;
