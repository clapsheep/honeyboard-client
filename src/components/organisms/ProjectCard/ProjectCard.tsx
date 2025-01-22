import { User } from '@/types/User';
import { Link } from 'react-router';

interface ProjectCardProps {
    title: string;
    subTitle: string;
    id: string;
    teams?: Pick<User, 'id' | 'name'>[];
    img?: string;
    isBookmarked?: boolean;
    pathname?: string;
}

const ProjectCard = ({
    title,
    subTitle,
    id,
    teams,
    img,
    pathname,
}: ProjectCardProps) => {
    return (
        <Link
            to={`${pathname}/${id}`}
            className="flex h-full w-full flex-col rounded border border-gray-300 bg-gray-50 shadow-md"
        >
            <div className="relative w-full flex-1 overflow-hidden pb-[68%]">
                {!img ? (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-900">
                        이미지가 없습니다.
                    </div>
                ) : (
                    <img
                        src={img}
                        alt={`${title} 이미지`}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                )}
            </div>
            <div className="flex w-full flex-col items-start border-t border-gray-300 px-4 py-3">
                <p className="text-text-sm font-semibold text-gray-900">
                    {title}
                </p>
                {teams ? (
                    <p className="w-full truncate text-text-xs font-medium text-gray-500 hover:text-gray-700">
                        {subTitle}
                    </p>
                ) : (
                    <p className="text-text-xs font-medium text-gray-500">
                        {subTitle}
                    </p>
                )}
            </div>
            {teams && (
                <div className="w-full border-t border-gray-300 px-4 py-2">
                    <ul className="flex gap-2">
                        {teams.map((data) => (
                            <li
                                key={data.id}
                                className="rounded-sm bg-bluegray-100 px-[0.625rem] text-text-xs text-gray-900"
                            >
                                {data.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Link>
    );
};

export default ProjectCard;
