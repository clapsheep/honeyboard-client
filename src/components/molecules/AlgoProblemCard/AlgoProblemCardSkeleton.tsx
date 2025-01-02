const AlgoProblemCardSkeleton = () => {
    return (
        <div className="flex h-full w-full animate-pulse flex-col items-center justify-center rounded border border-gray-300 px-4 shadow-lg">
            <div className="flex w-full items-center justify-between py-2">
                <div className="flex flex-col items-start space-y-2">
                    {/* Title Placeholder */}
                    <div className="h-4 w-3/4 rounded bg-gray-300"></div>
                    {/* Description Placeholder */}
                    <div className="h-3 w-1/2 rounded bg-gray-300"></div>
                </div>
                {/* Platform Icon Placeholder */}
                <div className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-gray-200 p-2"></div>
            </div>
            {/* Tags Placeholder */}
            <div className="w-full overflow-hidden">
                <ul className="flex gap-2 py-2">
                    {Array(3)
                        .fill(null)
                        .map((_, index) => (
                            <li
                                key={index}
                                className="h-5 w-12 rounded bg-gray-300"
                            ></li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default AlgoProblemCardSkeleton;
