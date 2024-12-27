import { Icon } from '@/components/atoms';

interface MusicTrackProps {
    title: string;
    channel: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MusicTrack = ({ title, channel, onClick, onDelete }: MusicTrackProps) => {
    return (
        <button
            onClick={onClick}
            className="flex w-full items-center justify-between border border-gray-300 bg-gray-25 py-3 pl-6 pr-4 shadow-md"
        >
            <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                    <Icon id="sound"></Icon>
                    <div className="text-text-md font-medium text-gray-900">
                        {title}
                    </div>
                </div>
                <div className="text-text-sm font-medium text-gray-400">
                    {channel}
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(e);
                }}
                className="rounded-sm bg-error-600 px-4 py-1 text-text-md font-semibold text-gray-25 shadow-sm"
            >
                삭제
            </button>
        </button>
    );
};
export default MusicTrack;
