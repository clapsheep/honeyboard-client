import { Icon, NavButton } from '@/components/atoms';
import { useState } from 'react';
import { useLocation } from 'react-router';

interface MenuProps {
    name: string;
    path: string;
    icon?: string;
    children?: MenuProps[];
}

interface NavMenuProps {
    menus: MenuProps[];
}

const NavMenu = ({ menus }: NavMenuProps) => {
    const location = useLocation();

    const [active, setActive] = useState<string[]>([]);

    const handleMenu = (menuName: string) => {
        setActive((prev) => {
            return prev.includes(menuName)
                ? prev.filter((name) => name !== menuName)
                : [...prev, menuName];
        });
    };

    const NAVIGATION = menus.map((menu) => {
        const isActive = menu.children
            ? active.includes(menu.name)
            : location.pathname.startsWith(menu.path);

        const childrenProps = menu.children && {
            hasSub: true,
            items: menu.children.map((subMenu) => ({
                id: subMenu.name,
                title: subMenu.name,
                link: subMenu.path,
                isActive: location.pathname.startsWith(subMenu.path),
            })),
        };

        const navProps = {
            key: menu.name,
            id: menu.name,
            title: menu.name,
            link: menu.path,
            isActive,
            ...childrenProps,
            ...(menu.icon && { icon: <Icon id={menu.icon} /> }),
            ...(menu.children && { onClick: () => handleMenu(menu.name) }),
        };

        return <NavButton {...navProps} />;
    });

    return <nav>{NAVIGATION}</nav>;
};

export default NavMenu;
