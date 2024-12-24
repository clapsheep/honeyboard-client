import { NameTag } from '@/components/atoms';

interface User {
    id: number;
    name: string;
    role: 'leader' | 'member';
}

interface TeamTagProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isSubmit?: boolean;
    team?: User[];
}

const TeamTag = ({ isSubmit = false, team = [], onClick }: TeamTagProps) => {
    const tagColor = isSubmit ? 'green' : 'red';
    const leader = team.find((member) => member.role === 'leader');
    const members = team.filter((member) => member.role === 'member');

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
