import Icon from '../Icon/Icon';

interface NameTagProps {
    children: React.ReactNode;
    isLeader?: boolean;
    color?: 'green' | 'red' | 'gray' | 'black';
}
const NameTag = ({ isLeader, children, color = 'black' }: NameTagProps) => {
    const BG_COLOR = {
        green: 'bg-success-25 border border-success-500',
        red: 'bg-error-25 border border-error-500',
        gray: 'bg-gray-100  border border-gray-500',
        black: 'bg-gray-25 border border-gray-900',
    };
    const TEXT_COLOR = {
        green: 'text-success-800',
        red: 'text-error-800',
        gray: 'text-gray-800',
        black: 'text-gray-900',
    };

    return (
        <div
            className={`flex items-center justify-center gap-1 rounded-sm px-2 py-1 ${BG_COLOR[color]}`}
        >
            {isLeader && <Icon id="crown"></Icon>}
            <span className={`text-text-md font-semibold ${TEXT_COLOR[color]}`}>
                {children}
            </span>
        </div>
    );
};
export default NameTag;
