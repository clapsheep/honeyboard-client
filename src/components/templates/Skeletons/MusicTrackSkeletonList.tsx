import { MusicTrackSkeleton } from '@/components/molecules';

const MusicTrackSkeletonList = () => {
    return (
        <div className="my-6 flex min-h-full flex-col items-center bg-red-500 p-4">
            {/* 유튜브 플레이어 스켈레톤 */}
            <div className="relative w-full pt-[56.25%]">
                <div className="absolute left-0 top-0 h-full w-full animate-pulse bg-gray-200" />
            </div>
            <div className="mt-4 w-full">
                <h3 className="text-center text-text-lg font-semibold">
                    플레이리스트
                </h3>
                <ul className="flex flex-col gap-2 overflow-y-auto">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <li key={index}>
                            <MusicTrackSkeleton />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MusicTrackSkeletonList;
