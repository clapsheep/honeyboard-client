import useMyPage from '@/hooks/useMyPage';

import { AlgoDetailCard } from '../molecules';
import { getMyAlgorithmAPI } from '@/api/mypageAPI';
import { useAuth } from '@/hooks/useAuth';

const MyAlgorithmList = () => {
    const { userInfo } = useAuth();
    const userId = userInfo?.userId ? userInfo?.userId : '0';
    const { data } = useMyPage({
        queryFn: getMyAlgorithmAPI({ userId }),
        queryKey: 'myAlgorithm',
    });
    console.log(data);

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            {data?.length ? (
                <>
                    <ul className="grid min-w-[1400px] grid-cols-4 gap-6">
                        {data.map((item) => (
                            <li key={item.solutionId}>
                                <AlgoDetailCard
                                    title={item.title}
                                    subTitle={item.updatedAt}
                                    memory={Number(item.memory)}
                                    time={Number(item.runtime)}
                                    language={item.languageId}
                                    isBookmarked={item.isBookmarked}
                                    onClick={() => {}}
                                    onBookmarkClick={() => {}}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="flex min-h-[200px] w-full items-center justify-center">
                    <p className="text-lg text-gray-500">
                        등록된 알고리즘 풀이가 없습니다.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyAlgorithmList;
