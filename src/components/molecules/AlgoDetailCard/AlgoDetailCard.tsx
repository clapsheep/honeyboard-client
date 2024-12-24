import { Icon } from '@/components/atoms';

interface AlgoDetailCardProps {
    title: string;
    subTitle: string; // 작성자
    memory: number;
    time: number;
    language: string;
    isBookmarked: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onBookmarkClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AlgoDetailCard = ({
    title,
    subTitle,
    memory,
    time,
    language,
    isBookmarked,
    onClick,
    onBookmarkClick,
}: AlgoDetailCardProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full rounded border border-gray-300 bg-gray-25 shadow-md"
        >
            <div className="flex w-full flex-col items-start px-4 py-3">
                <div className="flex w-full justify-between">
                    <p className="text-text-sm font-semibold text-gray-900">
                        {title}
                    </p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onBookmarkClick(e);
                        }}
                    >
                        {isBookmarked ? (
                            <Icon id="star" size={24}></Icon>
                        ) : (
                            <Icon id="star-empty" size={24}></Icon>
                        )}
                    </button>
                </div>
                <p className="text-text-xs font-medium text-gray-500">
                    {subTitle}
                </p>
            </div>
            <div className="flex justify-between px-2 pb-4">
                <div className="flex flex-col items-start px-2">
                    <p className="text-text-xs text-gray-700">Memory</p>
                    <p className="text-text-xs font-medium text-gray-700">
                        {memory.toLocaleString()} kb
                    </p>
                </div>
                <div className="flex flex-col items-start px-2">
                    <p className="text-text-xs text-gray-700">Time</p>
                    <p className="text-text-xs font-medium text-gray-700">
                        {time.toLocaleString()} ms
                    </p>
                </div>
                <div className="flex flex-col items-start px-2">
                    <p className="text-text-xs text-gray-700">Language</p>
                    <p className="text-text-xs font-medium text-gray-700">
                        {language}
                    </p>
                </div>
            </div>
        </button>
    );
};

export default AlgoDetailCard;
