import {
    AlgoProblemCardSkeleton,
    SearchBarSkeleton,
} from '@/components/molecules';

const AlgoProblemCardSkeletonList = () => {
    return (
        <div className="flex flex-col items-center gap-6 p-6">
            {/* SearchBar 스켈레톤 */}
            <div className="w-[500px]">
                <SearchBarSkeleton />
            </div>

            {/* ProjectCard 그리드 스켈레톤 */}
            <ul className="grid w-full grid-cols-4 grid-rows-4 gap-6">
                {Array.from({ length: 16 }).map((_, index) => (
                    <li key={index}>
                        <AlgoProblemCardSkeleton />
                    </li>
                ))}
            </ul>

            {/* Pagination 스켈레톤 */}
            <div className="h-10 w-[300px] rounded-lg bg-gray-200" />
        </div>
    );
};

export default AlgoProblemCardSkeletonList;
