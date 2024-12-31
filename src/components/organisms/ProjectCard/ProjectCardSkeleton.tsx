const ProjectCardSkeleton = () => {
    return (
        <div className="flex h-full w-full flex-col rounded border border-gray-300 bg-gray-50 shadow-md">
            {/* 이미지 영역 스켈레톤 */}
            <div className="relative w-full flex-1 overflow-hidden pb-[68%]">
                <div className="absolute inset-0 h-full w-full animate-pulse bg-gray-200" />
            </div>

            {/* 텍스트 영역 스켈레톤 */}
            <div className="flex w-full flex-col items-start gap-2 border-t border-gray-300 px-4 py-3">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
            </div>

            {/* 팀 태그 영역 스켈레톤 */}
            <div className="w-full border-t border-gray-300 px-4 py-2">
                <div className="flex gap-2">
                    <div className="h-5 w-16 animate-pulse rounded-sm bg-gray-200" />
                    <div className="h-5 w-16 animate-pulse rounded-sm bg-gray-200" />
                    <div className="h-5 w-16 animate-pulse rounded-sm bg-gray-200" />
                </div>
            </div>
        </div>
    );
};

export default ProjectCardSkeleton;
