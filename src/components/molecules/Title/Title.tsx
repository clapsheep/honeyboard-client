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
    const hasMultipleSubTitles = subTitleEntries.length > 1;
    
    return(
        <div className="w-full">
            {/* 제목 */}
            <div className="flex items-center">
                <span className="text-display-sm font-bold text-gray-900">{title}</span>
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

            {/* 프로젝트 목표, 설명 */}
            <div className="w-full mt-3">
                {subTitleEntries.map(([key, value], index) => (
                    <div key={index} className="w-full bg-gray-50 px-3 py-2 flex items-start gap-2">
                        <span className={`font-semibold text-gray-900 whitespace-nowrap ${hasMultipleSubTitles && index === 0 ? 'text-xl' : 'text-md'}`}>
                            {key}
                        </span>
                        {description && description[key] && (
                            <p className={`font-medium text-gray-900 break-words ${hasMultipleSubTitles && index === 0 ? 'text-xl' : 'text-md'}`}>
                                {description[key]}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Title;
