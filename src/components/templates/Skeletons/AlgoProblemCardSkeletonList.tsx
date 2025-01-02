import { AlgoProblemCardSkeleton } from '@/components/molecules';

interface AlgoProblemCardSkeletonListProps {
    count?: number;
}

const AlgoProblemCardSkeletonList = ({
    count = 8,
}: AlgoProblemCardSkeletonListProps) => {
    return (
        <ul className="grid w-full grid-cols-4 gap-6">
            {Array(count)
                .fill(null)
                .map((_, index) => (
                    <li key={index}>
                        <AlgoProblemCardSkeleton />
                    </li>
                ))}
        </ul>
    );
};

export default AlgoProblemCardSkeletonList;
