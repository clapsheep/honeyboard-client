import { useAuth } from '@/hooks/useAuth';
import useGetBookmarkList from '@/hooks/useGetBookmarkList';
import { AlgoDetailCard } from '../molecules';

const BMAlgorithmSolutionCards = () => {
    const { userInfo } = useAuth();
    const { data } = useGetBookmarkList({
        contentType: 'ALGO_SOLUTION',
        userId: userInfo!.userId,
    });

    return (
        <div className="flex flex-col items-center">
            {data?.content?.length ? (
                <ul className="grid w-[1400px] grid-cols-3 grid-rows-3 gap-6 pt-10">
                    {data.content.map((item) => (
                        <li key={item.id}>
                            <AlgoDetailCard
                                problemId={item.problemId}
                                solutionId={item.id}
                                title={item.title}
                                subTitle={item.subtitle}
                                memory={Number(item.memory)}
                                time={Number(item.runtime)}
                                language={item.languageName}
                            />
                        </li>
                    ))}
                </ul>
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
export default BMAlgorithmSolutionCards;
