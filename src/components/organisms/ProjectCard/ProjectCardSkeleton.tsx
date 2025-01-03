const ProjectCardSkeleton = () => {
    return (
        <div className="flex h-[280px] w-full flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
            {/* 썸네일 스켈레톤 */}
            <div className="h-[160px] w-full animate-pulse rounded-md bg-gray-200" />
            {/* 제목 스켈레톤 */}
            <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
            {/* 날짜 스켈레톤 */}
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
        </div>
    );
};

export default ProjectCardSkeleton;
