import { Icon, NavButton } from '@/components/atoms';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

interface MenuProps {
    name: string;
    path?: string;
    icon?: string;
    children?: MenuProps[];
}

interface NavMenuProps {
    menus: MenuProps[];
}

const NavMenu = ({ menus }: NavMenuProps) => {
    const location = useLocation();
    const [active, setActive] = useState<string[]>([]);

    // Path를 체크하는 callback 함수
    const isPathActive = useCallback(
        (path?: string) => {
            if (!path) return false;

            if (path === '/') {
                return location.pathname === '/';
            }
            return location.pathname.startsWith(path);
        },
        [location.pathname],
    );

    // 자식 요소가 활성화 되어있는지 확인하는 함수
    const isChildPathActive = (children?: MenuProps[]) => {
        if (!children) return false;

        return children.some((child) => isPathActive(child.path));
    };

    useEffect(() => {
        const activeMenus = menus.reduce((acc: string[], menu) => {
            if (menu.children?.some((child) => isPathActive(child.path))) {
                return [...acc, menu.name];
            }
            return acc;
        }, []);
        setActive(activeMenus);
    }, [location.pathname, menus, isPathActive]);

    const handleMenu = (
        menuName: string,
        menuPath?: string,
        children?: MenuProps[],
    ) => {
        setActive((prev) => {
            // 현재 경로가 활성화되어 있거나 하위 경로가 활성화된 경우
            const isCurrentlyActive =
                (menuPath && isPathActive(menuPath)) ||
                isChildPathActive(children);

            if (isCurrentlyActive) {
                // 이미 active 배열에 없다면 추가
                if (!prev.includes(menuName)) {
                    return [...prev, menuName];
                }
                return prev;
            }

            // 토글 동작
            if (prev.includes(menuName)) {
                return prev.filter((name) => name !== menuName);
            }
            return [...prev, menuName];
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
                link: subMenu.path || '',
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

    return <>{NAVIGATION}</>;
};

export default NavMenu;
