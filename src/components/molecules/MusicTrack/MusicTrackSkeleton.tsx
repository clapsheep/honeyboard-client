const MusicTrackSkeleton = () => {
    return (
        <div className="flex w-full items-center justify-between border border-gray-300 bg-gray-25 py-3 pl-6 pr-4 shadow-md">
            <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200" />
                    <div className="h-5 w-48 animate-pulse rounded-md bg-gray-200" />
                </div>
                <div className="h-4 w-32 animate-pulse rounded-md bg-gray-200" />
            </div>
            <div className="h-8 w-16 animate-pulse rounded-sm bg-gray-200" />
        </div>
    );
};

export default MusicTrackSkeleton;
