import { CalendarTag } from '@/components/atoms';
import { getPlatformInfo } from '@/utils/getPlatformInfo';

interface AlgoProblemCardProps {
    title: string;
    description: string;
    link: string;
    tags: string[];
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AlgoProblemCard = ({
    title,
    description,
    link,
    tags,
    onClick,
}: AlgoProblemCardProps) => {
    const platformInfo = getPlatformInfo(link);

    return (
        <button
            type="button"
            onClick={onClick}
            className="flex h-full w-full flex-col items-center justify-center rounded border border-gray-300 px-4 shadow-lg"
        >
            <div className="flex w-full items-center justify-between py-2">
                <div className="flex flex-col items-start">
                    <span className="text-text-sm font-semibold text-gray-900">
                        {title}
                    </span>
                    <span className="text-text-xs text-gray-500">
                        {description}
                    </span>
                </div>
                {platformInfo && (
                    <div className="flex items-center justify-center rounded border border-gray-300 p-2 shadow">
                        <img
                            src={platformInfo.icon}
                            alt={platformInfo.platform}
                        />
                    </div>
                )}
            </div>
            <div className="w-full overflow-hidden">
                {tags && tags.length > 0 && (
                    <ul className="flex gap-2 py-2">
                        {tags.map((tag) => (
                            <li key={tag} className="whitespace-nowrap">
                                <CalendarTag color="green">{tag}</CalendarTag>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </button>
    );
};
export default AlgoProblemCard;
