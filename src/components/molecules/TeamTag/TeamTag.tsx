import { NameTag } from '@/components/atoms';
import { TrackTeamMember } from '@/types/TrackProject';

interface TeamTagProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isSubmit?: boolean;
    team?: Pick<TrackTeamMember, 'id' | 'name' | 'role'>[];
}

const TeamTag = ({ isSubmit = false, team = [], onClick }: TeamTagProps) => {
    const tagColor = isSubmit ? 'green' : 'red';
    const leader = team.find((member) => member.role === 'LEADER');
    const members = team.filter((member) => member.role === 'MEMBER');

    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center gap-2 rounded-md border border-gray-300 bg-gray-25 px-3 py-2"
        >
            {leader && (
                <NameTag isLeader={true} color={tagColor}>
                    {leader.name}
                </NameTag>
            )}
            {members.length > 0 &&
                members.map((member) => (
                    <NameTag key={member.id} color={tagColor}>
                        {member.name}
                    </NameTag>
                ))}
        </button>
    );
};

export default TeamTag;
