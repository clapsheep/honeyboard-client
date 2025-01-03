import {
    AlgoProblemCardSkeleton,
    SearchBarSkeleton,
} from '@/components/molecules';

const AlgoProblemCardSkeletonList = () => {
    return (
        <div className="flex flex-col items-center gap-6 p-6">
            {/* SearchBar 스켈레톤 */}
            <SearchBarSkeleton />

            {/* ProjectCard 그리드 스켈레톤 */}
            <ul className="grid min-w-[1400px] grid-cols-4 grid-rows-2 gap-6">
                {Array.from({ length: 16 }).map((_, index) => (
                    <li key={index}>
                        <AlgoProblemCardSkeleton />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlgoProblemCardSkeletonList;
