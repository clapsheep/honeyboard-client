import { Icon } from '@/components/atoms';

interface WebSiteCardProps {
    title: string;
    subTitle: string; // 날짜
    site: string;
    isBookmarked: boolean;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    onBookmarkClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const WebSiteCard = ({
    title,
    subTitle,
    site,
    isBookmarked,
    onClick,
    onBookmarkClick,
}: WebSiteCardProps) => {
    return (
        <div
            onClick={onClick}
            className="w-[16.875rem] rounded border border-gray-300 bg-gray-25 shadow-lg"
        >
            <div className="flex flex-col px-4 py-3">
                <div className="flex justify-between">
                    <p className="text-text-sm font-semibold text-gray-900">
                        {title}
                    </p>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            onBookmarkClick(e);
                        }}
                    >
                        {isBookmarked ? (
                            <Icon id="star" size={24} />
                        ) : (
                            <Icon id="star-empty" size={24} />
                        )}
                    </div>
                </div>
                <p className="text-text-xs font-medium text-gray-500">
                    {subTitle}
                </p>
            </div>
            <div className="px-4 pb-3">
                <a
                    href={site}
                    onClick={(e) => e.stopPropagation()}
                    className="block truncate text-text-xs font-medium text-blue-600"
                >
                    {site}
                </a>
            </div>
        </div>
    );
};

export default WebSiteCard;
