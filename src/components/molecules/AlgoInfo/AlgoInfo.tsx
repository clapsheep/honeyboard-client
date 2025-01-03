import { CalendarTag } from '@/components/atoms';

export interface AlgoInfoProps {
    memory: string;
    runtime: string;
    onMemoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRuntimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onLanguageClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AlgoInfo = ({
    memory,
    runtime,
    onMemoryChange,
    onRuntimeChange,
    onLanguageClick,
}: AlgoInfoProps) => {
    const LANGUAGE_OPTIONS = [
        { id: '1', name: 'Java' },
        { id: '2', name: 'Python' },
        { id: '3', name: 'C++' },
    ];

    return (
        <div className="flex gap-6">
            <div className="flex items-center gap-1">
                <span className="font-bold text-gray-700 text-text-md">
                    Memory
                </span>
                <input
                    id="memory"
                    placeholder="0"
                    type="text"
                    value={memory}
                    onChange={onMemoryChange}
                    className="w-24 px-2 py-1 border border-gray-300 rounded-sm shadow-sm"
                />
                <span className="font-medium text-gray-700 text-text-md">
                    kb
                </span>
            </div>
            <div className="flex items-center gap-1">
                <span className="font-bold text-gray-700 text-text-md">
                    Time
                </span>
                <input
                    id="runtime"
                    placeholder="0"
                    type="text"
                    value={runtime}
                    onChange={onRuntimeChange}
                    className="w-24 px-2 py-1 border border-gray-300 rounded-sm shadow-sm"
                />
                <span className="font-medium text-gray-700 text-text-md">
                    ms
                </span>
            </div>
            <div className="flex items-center gap-1">
                <span className="font-bold text-gray-700 text-text-md">
                    Language
                </span>
                <div className="flex gap-3">
                    {LANGUAGE_OPTIONS.map((lang) => (
                        <CalendarTag key={lang.id} onClick={onLanguageClick}>
                            {lang.name}
                        </CalendarTag>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AlgoInfo;
