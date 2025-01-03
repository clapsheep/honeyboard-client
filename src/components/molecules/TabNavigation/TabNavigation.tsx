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
        <div className="relative">
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

            {/* active된 부모 route에 자식이 있을 경우에만 네비게이션 렌더링 */}
            {activeParentRoute?.children && (
                <nav className="top-100 absolute left-0 w-full">
                    <ul className="flex h-12 w-full flex-row items-center gap-4">
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
                </nav>
            )}
        </div>
    );
};

export default TabNavigation;
