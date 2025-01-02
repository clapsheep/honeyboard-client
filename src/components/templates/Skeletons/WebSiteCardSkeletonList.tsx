import { WebSiteCardSkeleton } from '@/components/molecules';

const WebSiteCardSkeletonList = () => {
    return (
        <ul className="grid w-full grid-cols-4 gap-6">
            {Array(8)
                .fill(0)
                .map((_, index) => (
                    <li key={index}>
                        <WebSiteCardSkeleton />
                    </li>
                ))}
        </ul>
    );
};

export default WebSiteCardSkeletonList;
