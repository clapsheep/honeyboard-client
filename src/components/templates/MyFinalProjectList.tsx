import useMyPage from '@/hooks/useMyPage';

import { ProjectCard } from '@/components/organisms';
import { getMyFinalAPI } from '@/api/mypageAPI';

const MyFinalProjectList = () => {
    const { data } = useMyPage({
        queryFn: getMyFinalAPI,
        queryKey: 'myFinalProject',
    });

    console.log(data);
    return (
        <div className="flex flex-col items-center gap-6 p-6">
            {data?.length ? (
                <>
                    <ul className="ml-40 grid min-w-[1400px] grid-cols-4 gap-6">
                        {data.map((item) => (
                            <li key={item.id}>
                                <ProjectCard
                                    title={item.title}
                                    subTitle={item.createdAt}
                                    id={item.id}
                                    teams={item.trackTeam}
                                    img={item.thumbnail}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="flex min-h-[200px] w-full items-center justify-center">
                    <p className="text-lg text-gray-500">
                        등록된 파이널 프로젝트가 없습니다.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyFinalProjectList;
