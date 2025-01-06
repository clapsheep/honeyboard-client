import useMyPage from '@/hooks/useMyPage';
import { getMyTrackAPI } from '@/services/mypage/mypageAPI';
import { ProjectCard } from '@/components/organisms';

const MyTrackProjectList = () => {
    const { data } = useMyPage({
        queryFn: getMyTrackAPI,
        queryKey: 'myTrackProject',
    });

    console.log(data);
    return (
        <div className="flex flex-col items-center gap-6 p-6">
            {data?.length ? (
                <>
                    <ul className="grid min-w-[1400px] grid-cols-4 gap-6">
                        {data.map((item) => (
                            <li key={item.projectId}>
                                <ProjectCard
                                    title={item.title}
                                    subTitle={item.updatedAt}
                                    id={item.projectId}
                                    img={item.thumbnail}
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

export default MyTrackProjectList;
