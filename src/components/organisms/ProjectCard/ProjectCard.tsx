interface ProjectCardProps {
    title: string;
    subTitle: string; // 파이널에서는 깃주소, 관통 포함 그 외는 날짜
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    teams?: string[];
    img?: string;
}

const ProjectCard = ({
    title,
    subTitle,
    onClick,
    teams,
    img,
}: ProjectCardProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex h-full w-full flex-col rounded border border-gray-300 bg-gray-50 shadow-md"
        >
            <div className="w-full flex-1 overflow-hidden">
                {!img ? (
                    <div className="flex h-full w-full items-center justify-center text-gray-900">
                        이미지가 없습니다.
                    </div>
                ) : (
                    <img
                        src={img}
                        alt={`${title} 이미지`}
                        className="h-full w-full object-cover"
                    />
                )}
            </div>
            <div className="flex w-full flex-col items-start border-t border-gray-300 px-4 py-3">
                <p className="text-text-sm font-semibold text-gray-900">
                    {title}
                </p>
                {teams ? (
                    <a
                        href={subTitle}
                        className="w-full truncate text-text-xs font-medium text-gray-500 hover:text-gray-700"
                    >
                        {subTitle}
                    </a>
                ) : (
                    <p className="text-text-xs font-medium text-gray-500">
                        {subTitle}
                    </p>
                )}
            </div>
            {teams && (
                <div className="w-full border-t border-gray-300 px-4 py-2">
                    <ul className="flex gap-2">
                        {teams.map((name, id) => (
                            <li
                                key={id}
                                className="rounded-sm bg-bluegray-100 px-[0.625rem] text-text-xs text-gray-900"
                            >
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </button>
    );
};

export default ProjectCard;
