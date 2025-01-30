import { NameTag } from '@/components/atoms';
import { TrackTeamMember } from '@/types/TrackProject';
import { Link } from 'react-router';

interface TeamTagProps {
    pathname: string;
    isSubmit?: boolean;
    team?: Pick<TrackTeamMember, 'id' | 'name' | 'role'>[];
}

const TeamTag = ({ isSubmit = false, team = [], pathname }: TeamTagProps) => {
    const tagColor = isSubmit ? 'green' : 'red';
    const leader = team.find((member) => member.role === 'LEADER');
    const members = team.filter((member) => member.role === 'MEMBER');

    return (
        <Link
            to={pathname}
            className="flex items-center gap-2 rounded-md border border-gray-300 bg-gray-25 px-3 py-2"
        >
            {leader && (
                <NameTag isLeader={'LEADER'} color={tagColor}>
                    {leader.name}
                </NameTag>
            )}
            {members.length > 0 &&
                members.map((member) => (
                    <NameTag
                        key={member.id}
                        isLeader={'MEMBER'}
                        color={tagColor}
                    >
                        {member.name}
                    </NameTag>
                ))}
        </Link>
    );
};

export default TeamTag;
