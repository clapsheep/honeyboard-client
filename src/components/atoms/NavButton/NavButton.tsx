import { Link } from 'react-router';
import Icon from '../Icon/Icon';
interface NavButtonProps {
    id: string;
    title: string;
    icon?: React.ReactNode;
    hasSub?: boolean;
    link?: string;
    // items: SubNavButtonProps[];
    isActive?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}

const NavButton = ({
    id,
    title,
    icon = null,
    hasSub = false,
    link = '/',
    // items,
    isActive = false,
    onClick,
}: NavButtonProps) => {
    const Component = hasSub ? 'button' : Link;

    const COLOR_PROS = {
        true: 'bg-blue-100 border border-gray-200',
        false: 'bg-gray-25 border border-gray-200',
    };

    const HAS_SUB_CONTENT_COLOR = isActive
        ? 'border-2 border-bluegray-400 bg-gray-25'
        : 'border border-gray-200 bg-gray-25';

    const NO_SUB_CONTENT_COLOR = isActive
        ? COLOR_PROS['true']
        : COLOR_PROS['false'];

    const HAS_SUB_CONTENT = (
        <Icon
            id="down"
            className={`ml-auto mr-6 transition-transform duration-500 ${isActive ? 'rotate-180' : ''}`}
        />
    );

    const NO_SUB_CONTENT = isActive && 'border-r-[0.375rem] border-blue-700';

    return (
        <li
            key={id}
            className={`box-border list-none hover:bg-bluegray-100 ${hasSub ? HAS_SUB_CONTENT_COLOR : NO_SUB_CONTENT_COLOR}`}
        >
            <Component
                to={link}
                onClick={onClick}
                className={`flex h-10 w-60 items-center gap-1 pl-9 ${hasSub ? '' : NO_SUB_CONTENT}`}
            >
                {icon}
                <span className="font-semibold text-gray-900">{title}</span>
                {hasSub ? HAS_SUB_CONTENT : null}
            </Component>
        </li>
    );
};

export default NavButton;
