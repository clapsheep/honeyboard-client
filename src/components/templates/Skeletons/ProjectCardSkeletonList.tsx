import { SearchBarSkeleton } from '@/components/molecules';
import { ProjectCardSkeleton } from '@/components/organisms';

const ProjectCardSkeletonList = () => {
    return (
        <div className="flex flex-col items-center gap-6 p-6">
            {/* SearchBar 스켈레톤 */}
            <SearchBarSkeleton />

            {/* ProjectCard 그리드 스켈레톤 */}
            <ul className="grid min-w-[1400px] grid-cols-4 grid-rows-2 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                    <li key={index}>
                        <ProjectCardSkeleton />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectCardSkeletonList;
