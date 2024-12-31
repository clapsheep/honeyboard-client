import { TabButton } from '@/components/atoms';
import { Link } from 'react-router';

export interface TabNavigationProps {
    routes: TabNavRouteType[];
}
export interface TabNavRouteType {
    path: string;
    name: string;
    isActive: boolean;
    children?: TabNavRouteType[];
}

const TabNavigation = ({ routes }: TabNavigationProps) => {
    const activeParentRoute = routes.find((route) => route.isActive);

    return (
        <div className="flex flex-col">
            <ul className="flex flex-row gap-6">
                {routes.map((route) => (
                    <li key={route.path}>
                        <TabButton
                            name={route.name}
                            path={route.path}
                            isActive={route.isActive}
                        />
                    </li>
                ))}
            </ul>

            {/* 활성화된 상위 라우트의 자식들 */}
            {activeParentRoute?.children && (
                <ul className="flex h-12 w-full flex-row items-center gap-4 bg-bluegray-50">
                    {activeParentRoute.children.map((child) => (
                        <li key={child.path}>
                            <Link
                                to={`/${child.path}`}
                                className={`text-md font-semibold ${
                                    child.isActive
                                        ? 'text-gray-900'
                                        : 'text-gray-400 hover:text-gray-700'
                                }`}
                            >
                                {child.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TabNavigation;
