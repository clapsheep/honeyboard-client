import { NavButton } from '@/components/atoms';
import { useNavigationItems } from '@/hooks/useNavigationItems';

export interface MenuProps {
    name: string;
    path?: string;
    icon?: string;
    children?: MenuProps[];
}

export interface NavMenuProps {
    menus: MenuProps[];
}

const NavMenu = ({ menus }: NavMenuProps) => {
    const { navigationItems } = useNavigationItems(menus);

    return (
        <>
            {navigationItems.map((navProps) => (
                <NavButton key={navProps.id} {...navProps} />
            ))}
        </>
    );
};

export default NavMenu;
