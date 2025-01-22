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
    userRole: string;
}

const NavMenu = ({ menus, userRole }: NavMenuProps) => {
    const { navigationItems } = useNavigationItems(menus, userRole);

    return (
        <>
            {navigationItems.map((navProps) => (
                <NavButton key={navProps.id} {...navProps} />
            ))}
        </>
    );
};

export default NavMenu;
