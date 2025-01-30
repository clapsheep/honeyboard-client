import { useAuth } from '@/hooks/useAuth';
import useGetBookmarkList from '@/hooks/useGetBookmarkList';
import { ProjectCard } from '../organisms';
import convertDate from '@/utils/convertDate';

const BMWebGuideCards = () => {
    const { userInfo } = useAuth();

    const { data } = useGetBookmarkList({
        contentType: 'WEB_GUIDE',
        userId: userInfo!.userId,
    });

    ///study/web/concept/47
    // http://localhost:5173/study/web/concept/41
    return (
        <div className="flex flex-col items-center gap-6 p-6">
            {data?.content?.length ? (
                <>
                    <ul className="grid min-w-[1400px] grid-cols-4 gap-6 pt-10">
                        {data.content.map((item) => (
                            <li key={item.id}>
                                <ProjectCard
                                    title={item.title}
                                    subTitle={convertDate(item.createdAt)}
                                    id={item.id}
                                    img={item.thumbnail}
                                    pathname="/study/web/concept"
                                />
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="flex min-h-[200px] w-full items-center justify-center">
                    <p className="text-lg text-gray-500">
                        등록된 컨셉 프로젝트가 없습니다.
                    </p>
                </div>
            )}
        </div>
    );
};
export default BMWebGuideCards;
