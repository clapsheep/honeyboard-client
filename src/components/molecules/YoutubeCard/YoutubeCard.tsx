import { Button } from '@/components/atoms';

interface YoutubeCardProps {
    thumbnail: string;
    title: string;
    channel: string;
    url: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onAddClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isAdded?: boolean;
}

const YoutubeCard = ({
    thumbnail,
    title,
    channel,
    onClick,
    isAdded,
    onAddClick,
}: YoutubeCardProps) => {
    return (
        <button
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                onClick(e);
            }}
            className="flex h-full w-full flex-col items-center rounded shadow-md"
        >
            <div className="relative w-full pt-[56.25%]">
                <img
                    src={thumbnail}
                    alt={title + ' thumbnail'}
                    className="absolute left-0 top-0 h-full w-full object-cover"
                />
            </div>
            <div className="flex w-full justify-between gap-3 px-4 py-3">
                <div className="flex min-w-0 flex-1 flex-col">
                    <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-left text-text-sm font-semibold text-gray-900">
                        {title}
                    </span>
                    <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-left text-text-xs text-gray-500">
                        {channel}
                    </span>
                </div>
                {isAdded ? (
                    <Button
                        className="shrink-0"
                        color="gray"
                        disabled
                        onClick={onAddClick}
                    >
                        저장됨
                    </Button>
                ) : (
                    <Button className="shrink-0" onClick={onAddClick}>
                        추가
                    </Button>
                )}
            </div>
        </button>
    );
};
export default YoutubeCard;
