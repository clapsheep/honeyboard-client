import { MusicTrack } from '@/components/molecules';
import { useGetYoutubeList, useMusicMutation } from '@/hooks/useYoutube';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const PlayListSection = () => {
    const { deleteMusic } = useMusicMutation();

    // 플레이리스트 목록 조회
    // 여기서 서스펜스 사용시 새로고침하면 에러가 나는데 왜그러는지 모르겠음
    // const { data: musicList } = useSuspenseYoutubeList();
    const { data: musicList } = useGetYoutubeList();

    // 선택된 노래 아이디
    const [selectedVideoId, setSelectedVideoId] = useState('');

    // 선택된 노래 아이디 초기 설정
    useEffect(() => {
        if (musicList?.[0]?.videoId) {
            setSelectedVideoId(musicList[0].videoId);
        }
    }, [musicList]);

    // 선택된 노래 아이디 변경
    const onSelectVideo = (videoId: string) => {
        setSelectedVideoId(videoId);
    };

    // 플레이리스트에서 노래 삭제
    const onDeleteVideo = (id: string) => {
        deleteMusic(id);
    };

    return (
        <div className="my-6 flex w-[464px] flex-col items-center rounded-xl border border-gray-300 bg-gray-25 p-4 shadow-md">
            <div className="flex h-full w-full flex-col">
                <div className="relative h-[243px] w-[432px]">
                    {selectedVideoId ? (
                        <iframe
                            allowFullScreen
                            className="h-full w-full"
                            src={`https://www.youtube.com/embed/${selectedVideoId}`}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100">
                            <p>재생할 영상이 없습니다.</p>
                        </div>
                    )}
                </div>
                <div className="flex flex-1 flex-col overflow-hidden">
                    <h3 className="py-3 text-center text-text-lg font-semibold">
                        플레이리스트
                    </h3>

                    <ul className="flex h-[550px] flex-col gap-2 overflow-y-auto py-2">
                        {musicList?.length === 0 ? (
                            <li className="mt-20 flex flex-col items-center gap-4 self-center">
                                <Link
                                    to="/music/search"
                                    className="flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
                                >
                                    노래 검색 하러가기
                                </Link>
                                <p className="text-xs text-gray-600">
                                    재생할 음악이 없습니다.
                                </p>
                            </li>
                        ) : (
                            musicList?.map((music) => (
                                <li key={music.id}>
                                    <MusicTrack
                                        id={music.id}
                                        videoId={music.videoId}
                                        title={music.title}
                                        channel={music.channel}
                                        onClick={onSelectVideo}
                                        onDelete={onDeleteVideo}
                                    />
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
        // </Suspense>
    );
};

export default PlayListSection;
