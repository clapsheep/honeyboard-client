const WebSiteCardSkeleton = () => {
    return (
        <div className="h-full w-full rounded border border-gray-300 bg-gray-25 shadow-lg">
            <div className="flex w-full flex-col items-start px-4 py-3">
                <div className="flex w-full justify-between">
                    {/* 제목 스켈레톤 */}
                    <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200"></div>
                    {/* 북마크 아이콘 스켈레톤 */}
                    <div className="h-6 w-6 animate-pulse rounded bg-gray-200"></div>
                </div>
                {/* 서브타이틀(날짜) 스켈레톤 */}
                <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
            </div>
            {/* 사이트 링크 스켈레톤 */}
            <div className="px-4 pb-3">
                <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
            </div>
        </div>
    );
};
export default WebSiteCardSkeleton;
