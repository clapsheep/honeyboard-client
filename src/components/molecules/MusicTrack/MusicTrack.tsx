import { Icon } from '@/components/atoms';
import styles from './MusicTrack.module.css';

interface MusicTrackProps {
    id: string;
    videoId: string;
    title: string;
    channel: string;
    onClick: (id: string) => void;
    onDelete: (id: string) => void;
}

const MusicTrack = ({
    id,
    videoId,
    title,
    channel,
    onClick,
    onDelete,
}: MusicTrackProps) => {
    return (
        <div
            onClick={() => onClick(videoId)}
            className="group flex w-full cursor-pointer items-center justify-between border border-gray-300 bg-gray-25 py-3 pl-6 pr-4 shadow-md"
        >
            <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                    <Icon id="sound" />
                    <div className="relative w-[280px] overflow-hidden">
                        <div
                            className={`${styles['marquee-text']} text-text-md font-medium text-gray-900`}
                        >
                            <span className="mr-4">{title}</span>
                        </div>
                    </div>
                </div>
                <div className="text-text-sm font-medium text-gray-400">
                    {channel}
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(id);
                }}
                className="rounded-sm bg-error-600 px-4 py-1 text-text-md font-semibold text-gray-25 shadow-sm"
            >
                삭제
            </button>
        </div>
    );
};
export default MusicTrack;
