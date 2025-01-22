import { Link } from 'react-router';

interface AlgoDetailCardProps {
    problemId: string;
    solutionId: string;
    title: string;
    subTitle: string; // 작성자
    memory: number;
    time: number;
    language: string;
}

const AlgoDetailCard = ({
    problemId,
    solutionId,
    title,
    subTitle,
    memory,
    time,
    language,
}: AlgoDetailCardProps) => {
    return (
        <Link
            type="button"
            to={`/study/algorithm/problem/${problemId}/solution/${solutionId}`}
            className="flex h-full flex-col rounded border border-gray-300 bg-gray-25 shadow-md"
        >
            <div className="flex w-full flex-col items-start px-4 py-3">
                <div className="flex w-full justify-between">
                    <p className="text-text-sm font-semibold text-gray-900">
                        {title}
                    </p>
                </div>
                <p className="text-text-xs font-medium text-gray-500">
                    {subTitle}
                </p>
            </div>
            <div className="flex justify-between px-2 pb-4">
                <div className="flex flex-col items-start px-2">
                    <p className="text-text-xs text-gray-700">Memory</p>
                    <p className="text-text-xs font-medium text-gray-700">
                        {memory.toLocaleString()} kb
                    </p>
                </div>
                <div className="flex flex-col items-start px-2">
                    <p className="text-text-xs text-gray-700">Time</p>
                    <p className="text-text-xs font-medium text-gray-700">
                        {time.toLocaleString()} ms
                    </p>
                </div>
                <div className="flex flex-col items-start px-2">
                    <p className="text-text-xs text-gray-700">Language</p>
                    <p className="text-text-xs font-medium text-gray-700">
                        {language}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default AlgoDetailCard;
