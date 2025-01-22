import { Link } from 'react-router';

interface TabButtonProps {
    name: string;
    path: string;
    isActive?: boolean;
}

const TabButton = ({ name, path, isActive }: TabButtonProps) => {
    return (
        <Link
            to={`/${path}`}
            aria-selected={isActive}
            className={`border-b-2 text-text-md font-semibold ${
                isActive
                    ? 'border-blue-700 text-blue-700'
                    : 'border-gray-500 text-gray-500'
            }`}
        >
            {name}
        </Link>
    );
};

export default TabButton;
