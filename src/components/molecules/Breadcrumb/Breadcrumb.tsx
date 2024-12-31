import { Icon } from '@/components/atoms';
import calcRouteStructure from '@/utils/calcRouteStructure';
import { useNavigate } from 'react-router';

export interface BreadcrumbProps {
    pathname: string;
    onNavigate?: (path: string | number) => void;
}

const Breadcrumb = ({ pathname }: BreadcrumbProps) => {
    const navigate = useNavigate();
    const routes = calcRouteStructure(pathname);

    return (
        <div className="flex items-center gap-2">
            <button
                className="flex items-center justify-center"
                onClick={() => navigate(-1)}
            >
                <Icon id="back-arrow" />
            </button>
            <div className="flex items-center">
                {routes.map((route, index) => (
                    <div key={route.path} className="flex items-center">
                        {index === routes.length - 1 ? (
                            <span className="text-text-md font-semibold text-gray-900">
                                {route.name}
                            </span>
                        ) : (
                            <button
                                className="text-text-md text-gray-600 transition-colors hover:text-blue-500"
                                onClick={() => navigate(route.path)}
                            >
                                {route.name}
                            </button>
                        )}
                        {index < routes.length - 1 && (
                            <span className="mx-2 text-gray-400">&gt;</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Breadcrumb;
