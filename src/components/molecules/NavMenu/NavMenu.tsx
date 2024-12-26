import { Icon, NavButton } from '@/components/atoms';
import { useEffect, useState } from 'react';
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

    useEffect(() => {
        setActive([]);
    }, [location.pathname]);

    const isPathActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    const handleMenu = (menuName: string, menuPath: string) => {
        setActive((prev) => {
            if (isPathActive(menuPath)) {
                return [...prev];
            }

            return prev.includes(menuName)
                ? prev.filter((name) => name !== menuName)
                : [menuName];
        });
    };

    const NAVIGATION = menus.map((menu) => {
        const isActive = menu.children
            ? active.includes(menu.name) || isPathActive(menu.path)
            : isPathActive(menu.path);

        const childrenProps = menu.children && {
            hasSub: true,
            items: menu.children.map((subMenu) => ({
                id: subMenu.name,
                title: subMenu.name,
                link: subMenu.path,
                isActive: isPathActive(subMenu.path),
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
            ...(menu.children && {
                onClick: () => handleMenu(menu.name, menu.path),
            }),
        };

        return <NavButton {...navProps} />;
    });

    return <nav className="mb-4">{NAVIGATION}</nav>;
};

export default NavMenu;
