import { Icon } from "@/components/atoms";

interface TitleProps {
    onClickLike?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    title: string;
    author?: string;
    subTitle?: Record<string, string>;
    description?: Record<string,string>
    isLiked?: boolean;
}

const Title = ({
    title,
    author,
    subTitle,
    description,
    isLiked = false,
    onClickLike,
}: TitleProps) => {
    const subTitleEntries = Object.entries(subTitle || {});
    const descriptionEntries = Object.entries(description || {});
    const hasContent = subTitleEntries.length > 0 || descriptionEntries.length > 0;

    return(
        <div className="w-full flex flex-col">
            {/* 제목 */}
            <div className="flex items-center">
                <h2 className="text-display-sm font-bold text-gray-900">{title}</h2>
                {onClickLike && (
                    <button 
                    onClick={onClickLike}
                    className="px-1"
                >
                    <Icon 
                        id={isLiked ? 'star' : 'star-empty'}
                        size={28}
                    />
                </button>
                )}
            </div>

            {/* 작성자 */}
            {author && (
                <div className="mt-1">
                    <span className="text-md font-semibold text-gray-900">{author}</span>
                </div>
            )}

            {/* 부제와와 요약 */}
            {hasContent && (
                <div className="w-full mt-3 bg-gray-50 px-3 py-2 flex flex-col gap-2">
                    {/* 부제 */}
                    {subTitleEntries.map(([key, value], index) => (
                        <div key={`subtitle-${index}`} className="flex items-start gap-2">
                            <h3 className="text-xl font-semibold text-gray-900 whitespace-nowrap">
                                {key}
                            </h3>
                            <p className="text-xl font-medium text-gray-900 break-words">
                                {value}
                            </p>
                        </div>
                    ))}

                    {/* 요약 */}
                    {descriptionEntries.map(([key, value], index) => (
                        <div key={`description-${index}`} className="flex items-start gap-2">
                            <span className="text-md font-semibold text-gray-900 whitespace-nowrap">
                                {key}
                            </span>
                            <p className="text-md font-medium text-gray-900 break-words">
                                {value}
                            </p>
                        </div>
                    ))}
                </div>
            )}    
        </div>
    );
};

export default Title;
