const StudentInfoSkeleton = () => {
    return (
        <li className="grid w-full grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center border border-gray-300 bg-gray-25 px-12 py-3">
            <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-8 animate-pulse rounded bg-gray-200" />
            <div>
                <div className="h-9 w-20 animate-pulse rounded bg-gray-200" />
            </div>
        </li>
    );
};

export default StudentInfoSkeleton;
