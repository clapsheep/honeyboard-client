const AlgoDetailCardSkeletonList = () => {
    return (
        <div className="grid grid-cols-3 gap-6">
            {Array.from({ length: 9 }, (_, index) => (
                <div
                    key={index}
                    className="animate-pulse rounded border border-gray-300 bg-gray-100 p-4"
                >
                    {/* Title skeleton */}
                    <div className="mb-2 h-5 w-3/4 rounded bg-gray-300"></div>

                    {/* Subtitle skeleton */}
                    <div className="mb-4 h-4 w-1/2 rounded bg-gray-300"></div>

                    {/* Info skeleton */}
                    <div className="flex justify-between">
                        <div className="h-4 w-1/3 rounded bg-gray-300"></div>
                        <div className="h-4 w-1/3 rounded bg-gray-300"></div>
                        <div className="h-4 w-1/3 rounded bg-gray-300"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AlgoDetailCardSkeletonList;
