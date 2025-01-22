import { Link } from 'react-router';
import Icon from '../Icon/Icon';
import SubNavButton, { SubNavButtonProps } from '../SubNavButton/SubNavButton';

export interface NavButtonProps {
    id: string;
    title: string;
    icon?: React.ReactNode;
    link?: string;
    items?: SubNavButtonProps[];
    isActive?: boolean;
    onClick?: (
        e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => void;
    color?: string;
    className?: string;
}

const NavButton = ({
    id,
    title,
    icon = null,
    link = '/',
    items,
    isActive = false,
    onClick,
    color,
    className,
}: NavButtonProps) => {
    const Component = onClick ? 'button' : Link;

    const SUB_NAV_HEIGHT = items ? items?.length * 44 + 4 : 0;

    const HAS_SUB_CONTENT_COLOR = isActive
        ? 'border bg-gray-25 hover:bg-bluegray-100'
        : 'border border-gray-200 bg-gray-25 hover:bg-bluegray-100';

    const NO_SUB_CONTENT_COLOR = isActive
        ? 'bg-blue-100 border border-gray-200'
        : 'bg-gray-25 border border-gray-200 hover:bg-bluegray-100';

    const HAS_SUB_CONTENT = (
        <Icon
            id="down"
            className={`ml-auto mr-6 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
        />
    );

    const NO_SUB_CONTENT = isActive ? (
        <div className="ml-auto h-10 w-[0.375rem] bg-blue-700"></div>
    ) : null;

    const SUB_ITEMS = items
        ? items.map((item) => (
              <li className="mb-1" key={item.id}>
                  <SubNavButton
                      id={item.id}
                      title={item.title}
                      isActive={item.isActive}
                      link={item.link}
                  />
              </li>
          ))
        : null;

    return (
        <li
            key={id}
            className={`box-border list-none ${className ? className : ''}`}
        >
            <Component
                to={link}
                onClick={onClick}
                className={`flex h-10 w-60 items-center gap-1 pl-9 ${items ? HAS_SUB_CONTENT_COLOR : NO_SUB_CONTENT_COLOR}`}
            >
                {icon}
                <span
                    className={`font-semibold ${color ? color : 'text-gray-900'}`}
                >
                    {title}
                </span>
                {items ? HAS_SUB_CONTENT : NO_SUB_CONTENT}
            </Component>
            {items ? (
                <ul
                    style={{ height: isActive ? `${SUB_NAV_HEIGHT}px` : '0px' }}
                    className={`overflow-hidden transition-all duration-500 ${isActive ? 'pt-1' : null}`}
                >
                    {SUB_ITEMS}
                </ul>
            ) : null}
        </li>
    );
};

export default NavButton;
