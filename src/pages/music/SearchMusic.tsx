import { SearchBar, YoutubeCard } from '@/components/molecules';
import { Header } from '@/components/organisms';
import {
    useGetYoutubeList,
    useMusicMutation,
    useSearchYoutube,
} from '@/hooks/useYoutube';
import { useModalStore } from '@/stores/modalStore';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

const SearchMusic = () => {
    const { pathname } = useLocation();
    const [inputKeyword, setInputKeyword] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const { openModal, closeModal } = useModalStore();
    const { addMusic } = useMusicMutation();

    const observerRef = useRef<HTMLDivElement>(null);

    // 검색어 입력 변경
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputKeyword(e.target.value);
    };

    // 검색 버튼 클릭
    const handleSearch = () => {
        if (inputKeyword) {
            setSearchKeyword(inputKeyword);
            setIsSearch(true);
        } else {
            openModal({
                title: '경고',
                subTitle: '검색어를 입력해주세요.',
                onCancelClick: () => {},
            });
        }
    };

    // 검색 결과 조회
    const { data, isLoading, fetchNextPage, isQuotaExceeded } =
        useSearchYoutube(searchKeyword, isSearch);

    // 무한 스크롤
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    !isLoading &&
                    data?.pages?.length
                ) {
                    fetchNextPage();
                }
            },
            { threshold: 0.5 },
        );
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [fetchNextPage, isLoading, data?.pages]);

    // 플리에 등록된 노래 목록 조회
    const { data: musicList } = useGetYoutubeList();
    console.log(musicList);

    // 노래 추가 삭제
    const handleAddMusic = (
        videoId: string,
        title: string,
        channel: string,
    ) => {
        addMusic({ videoId, title, channel });
    };

    // 쿼터 초과시 모달 표시
    useEffect(() => {
        if (isQuotaExceeded) {
            openModal({
                title: '검색한도 초과',
                subTitle: '내일 다시 시도해주세요.',
                onCancelClick: () => {
                    closeModal();
                },
            });
        }
    }, [isQuotaExceeded]);

    return (
        <div className='flex flex-col items-center'>
            <Header
                titleProps={{ title: '노래 신청' }}
                BreadcrumbProps={{ pathname }}
            />
            <div className="mx-auto my-6 w-[40%]">
                <SearchBar
                    id="search-music"
                    label="노래 검색"
                    placeholder="노래 검색"
                    inputValue={inputKeyword}
                    onClickSearch={handleSearch}
                    onChange={handleChange}
                />
            </div>
            <div className="grid w-[1400px] grid-cols-3 gap-4 px-[85px]">
                {data ? (
                    data.pages.map((page) =>
                        page.items.map((item) => (
                            <YoutubeCard
                                key={item.id.videoId}
                                title={item.snippet.title}
                                channel={item.snippet.channelTitle}
                                thumbnail={item.snippet.thumbnails.high.url}
                                onClick={() => {
                                    window.open(
                                        `https://www.youtube.com/watch?v=${item.id.videoId}`,
                                        '_blank',
                                    );
                                }}
                                isAdded={musicList?.some(
                                    (music) =>
                                        music.videoId === item.id.videoId,
                                )}
                                onAddClick={(e) => {
                                    e.stopPropagation();
                                    handleAddMusic(
                                        item.id.videoId,
                                        item.snippet.title,
                                        item.snippet.channelTitle,
                                    );
                                }}
                            />
                        )),
                    )
                ) : (
                    <div className="col-start-2 text-center">
                        검색어를 입력해주세요.
                    </div>
                )}
                <div
                    ref={observerRef}
                    className="col-start-2 flex h-10 justify-center"
                >
                    {searchKeyword &&
                        !isQuotaExceeded && ( // 검색어가 있고 쿼터 초과가 아닐 때만
                            <>
                                {isLoading === false && (
                                    <img
                                        src="/assets/loading/spinner.svg"
                                        alt="로딩중"
                                    />
                                )}
                            </>
                        )}
                </div>
            </div>
        </div>
    );
};

export default SearchMusic;
