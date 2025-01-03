import { SearchBarSkeleton, WebSiteCardSkeleton } from '@/components/molecules';

const WebSiteCardSkeletonList = () => {
    return (
        <div className="flex flex-col items-center gap-6 p-6">
            {/* SearchBar 스켈레톤 */}
            <div className="w-[500px]">
                <SearchBarSkeleton />
            </div>

            {/* WebSiteCard 그리드 스켈레톤 */}
            <ul className="grid min-w-[1600px] grid-cols-4 grid-rows-4 gap-6">
                {Array.from({ length: 16 }).map((_, index) => (
                    <li key={index}>
                        <WebSiteCardSkeleton />
                    </li>
                ))}
            </ul>

            {/* Pagination 스켈레톤 */}
            <div className="h-10 w-[300px] rounded-lg bg-gray-200" />
        </div>
    );
};

export default WebSiteCardSkeletonList;
