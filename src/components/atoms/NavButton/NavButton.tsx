import Icon from '../Icon/Icon';

interface NavButtonProps {
    id: string;
    title: string;
    icon?: React.ReactNode;
    hasSub?: boolean;
    // items: SubNavButtonProps[];
    isActive?: boolean;
    onClick: (e: React.MouseEvent) => void;
}

const NavButton = ({
    id,
    title,
    icon = null,
    hasSub = false,
    // items,
    isActive = false,
    onClick,
}: NavButtonProps) => {
    const COLOR_PROS = {
        true: 'bg-blue-100 border border-gray-200',
        false: 'bg-gray-25 border border-gray-200',
    };

    const hasSubContentColor = isActive
        ? 'border-2 border-bluegray-400 bg-gray-25'
        : 'border border-gray-200 bg-gray-25';

    const noSubContentColor = isActive
        ? COLOR_PROS['true']
        : COLOR_PROS['false'];

    const hasSubContent = (
        <Icon
            id="down"
            className={`ml-auto mr-6 transition-transform duration-500 ${isActive ? 'rotate-180' : ''}`}
        />
    );

    const noSubContent = isActive && (
        <div className="ml-auto h-full w-[0.375rem] bg-blue-700"></div>
    );

    return (
        <li
            key={id}
            className={`box-border list-none hover:bg-bluegray-100 ${hasSub ? hasSubContentColor : noSubContentColor}`}
        >
            <button
                type="button"
                onClick={onClick}
                className="flex h-10 w-60 items-center gap-1 pl-9"
                aria-expanded={isActive}
            >
                {icon}
                <span className="font-semibold text-gray-900">{title}</span>
                {hasSub ? hasSubContent : noSubContent}
            </button>
        </li>
    );
};

export default NavButton;
