import { Icon } from '@/components/atoms';
import { NavButtonProps } from '@/components/atoms/NavButton/NavButton';
import { MenuProps } from '@/components/molecules/NavMenu/NavMenu';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

export const useNavigationItems = (menus: MenuProps[], userRole: string) => {
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
    const isChildPathActive = useCallback(
        (children?: MenuProps[]) => {
            if (!children) return false;

            return children.some((child) => isPathActive(child.path));
        },
        [isPathActive],
    );

    // 경로 변경 될때마다 경로 버튼 상태 변경 함수
    useEffect(() => {
        const activeMenus = menus.reduce((acc: string[], menu) => {
            if (menu.children?.some((child) => isPathActive(child.path))) {
                return [...acc, menu.name];
            }
            return acc;
        }, []);
        setActive(activeMenus);
    }, [location.pathname, menus, isPathActive]);

    // 메뉴 토글 이벤트 함수
    const handleMenu = useCallback(
        (menuName: string, menuPath?: string, children?: MenuProps[]) => {
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
        },
        [isPathActive, isChildPathActive],
    );

    // 네비게이션 아이템들
    const navigationItems = useMemo(
        () =>
            menus
                .filter((menu) => {
                    // 학생관리 메뉴는 ADMIN 권한을 가진 사용자에게만 보여줍니다
                    if (menu.name === '학생관리') {
                        return userRole === 'ADMIN';
                    }
                    return true;
                })
                .map((menu): NavButtonProps => {
                    // return 추가
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

                    const iconProp = menu.icon
                        ? { icon: <Icon id={menu.icon} /> }
                        : {};

                    return {
                        id: menu.name,
                        title: menu.name,
                        link: menu.path,
                        isActive,
                        ...childrenProps,
                        ...iconProp,
                        ...(menu.children && {
                            onClick: () => handleMenu(menu.name, menu.path),
                        }),
                    };
                }),
        [menus, active, isPathActive, handleMenu, userRole],
    );

    return { active, isPathActive, handleMenu, navigationItems };
};
