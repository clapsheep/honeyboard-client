import { CalendarTag } from '@/components/atoms';

export interface AlgoInfoProps {
    memory: string;
    runtime: string;
    languageId: string;
    readOnly?: boolean;
    onMemoryChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRuntimeChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onLanguageClick?: (languageId: string) => void;
}

const AlgoInfo = ({
    memory,
    runtime,
    languageId,
    readOnly = false,
    onMemoryChange,
    onRuntimeChange,
    onLanguageClick,
}: AlgoInfoProps) => {
    const LANGUAGE_OPTIONS = [
        { id: '1', name: 'Java' },
        { id: '2', name: 'Python' },
        { id: '3', name: 'C++' },
    ];

    const selectedLanguage = LANGUAGE_OPTIONS.find(
        (lang) => lang.id == languageId,
    );

    return (
        <div className="flex gap-6">
            <div className="flex items-center gap-1">
                <span className="text-text-md font-bold text-gray-700">
                    Memory
                </span>
                {readOnly ? (
                    <span className="w-24 px-2 py-1">{memory} kb</span>
                ) : (
                    <>
                        <input
                            id="memory"
                            placeholder="0"
                            type="text"
                            value={memory}
                            onChange={onMemoryChange}
                            className="w-24 rounded-sm border border-gray-300 px-2 py-1 shadow-sm"
                        />
                        <span className="text-text-md font-medium text-gray-700">
                            kb
                        </span>
                    </>
                )}
            </div>
            <div className="flex items-center gap-1">
                <span className="text-text-md font-bold text-gray-700">
                    Time
                </span>
                {readOnly ? (
                    <span className="w-24 px-2 py-1">{runtime} ms</span>
                ) : (
                    <>
                        <input
                            id="runtime"
                            placeholder="0"
                            type="text"
                            value={runtime}
                            onChange={onRuntimeChange}
                            className="w-24 rounded-sm border border-gray-300 px-2 py-1 shadow-sm"
                        />
                        <span className="text-text-md font-medium text-gray-700">
                            ms
                        </span>
                    </>
                )}
            </div>
            <div className="flex items-center gap-1">
                <span className="text-text-md font-bold text-gray-700">
                    Language
                </span>
                <div className="flex gap-3">
                    {readOnly ? (
                        <CalendarTag color="blue" readOnly>
                            {selectedLanguage?.name}
                        </CalendarTag>
                    ) : (
                        LANGUAGE_OPTIONS.map((lang) => (
                            <CalendarTag
                                key={lang.id}
                                onClick={() => onLanguageClick?.(lang.id)}
                                color={
                                    languageId === lang.id ? 'blue' : 'regular'
                                }
                            >
                                {lang.name}
                            </CalendarTag>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlgoInfo;
