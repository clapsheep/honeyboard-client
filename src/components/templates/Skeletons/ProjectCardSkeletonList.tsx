import { ProjectCardSkeleton } from '@/components/organisms';

const ProjectCardSkeletonList = () => {
    return (
        <ul className="grid w-full grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
                <li key={index}>
                    <ProjectCardSkeleton />
                </li>
            ))}
        </ul>
    );
};

export default ProjectCardSkeletonList;
