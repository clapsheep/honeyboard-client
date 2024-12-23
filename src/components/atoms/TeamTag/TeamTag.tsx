import Icon from "../Icon/Icon";

interface User {
    id: number;
    name: string;
    role: 'leader' | 'member';    
}

interface TeamTagProps {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    isSubmit?: boolean;
    team? : User[];   
}

const TeamTag = ({
    isSubmit = false,
    team = [],
    onClick,
}: TeamTagProps) => {
    const COLOR_PROS = {
        red: 'text-error-800 border border-error-500 bg-error-25',
        green: 'text-success-800 border border-success-500 bg-success-25',
    };

    const tagColor = isSubmit ? COLOR_PROS.green : COLOR_PROS.red;
    const leader = team.find(member => member.role === 'leader');
    const members = team.filter(member => member.role === 'member');

    return (
        <div 
        onClick={onClick}
        className="rounded-md px-3 py-2 border border-gray-300 bg-gray-25 flex items-center gap-2">
            {leader && (
                <div className={`rounded-sm px-2 py-1 text-text-md font-semibold ${tagColor} flex items-center gap-1`}>
                    <Icon 
                        id="leader" 
                        size={15} 
                        color="#F6D523" 
                        viewBox="0 0 15 14"
                    />
                    <span>{leader.name}</span>
                </div>
            )}
            {members.length > 0 && members.map(member => (
                <div 
                    key={member.id}
                    className={`rounded-sm px-2 py-1 text-text-md font-semibold ${tagColor}`}
                >
                    <span>{member.name}</span>
                </div>
            ))}
        </div>
    );
};

export default TeamTag;
