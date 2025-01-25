import { useAuth } from '@/hooks/useAuth';
import useGetBookmarkList from '@/hooks/useGetBookmarkList';
import { ProjectCard } from '../organisms';
import { useLocation } from 'react-router';

const BMAlgorithmGuideCards = () => {
    const { userInfo } = useAuth();
    const { pathname } = useLocation();
    const { data } = useGetBookmarkList({
        contentType: 'ALGO_GUIDE',
        userId: userInfo!.userId,
    });
    console.log('called PAGE', data);
    return (
        <div className="flex flex-col items-center gap-6 p-6">
            {data?.content?.length ? (
                <ul className="grid w-[1400px] grid-cols-4 grid-rows-2 gap-6 pt-10">
                    {data.content.map((item) => (
                        <li key={item.id}>
                            <ProjectCard
                                title={item.title}
                                subTitle={item.createdAt}
                                id={item.id}
                                img={item.thumbnail}
                                pathname={pathname}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex min-h-[200px] w-full items-center justify-center">
                    <p className="text-lg text-gray-500">
                        등록된 알고리즘 개념이 없습니다.
                    </p>
                </div>
            )}
        </div>
    );
};
export default BMAlgorithmGuideCards;
