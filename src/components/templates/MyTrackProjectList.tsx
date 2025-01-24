import useMyPage from '@/hooks/useMyPage';

import { ProjectCard } from '@/components/organisms';
import { getMyTrackAPI } from '@/api/mypageAPI';

const MyTrackProjectList = () => {
    const { data } = useMyPage({
        queryFn: getMyTrackAPI,
        queryKey: 'myTrackProject',
    });

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            {data?.length ? (
                <>
                    <ul className="ml-40 grid min-w-[1400px] grid-cols-4 gap-6">
                        {data.map((item) => (
                            <li key={item.id}>
                                <ProjectCard
                                    title={item.trackProjectName}
                                    subTitle={item.title}
                                    id={item.id}
                                    img={item.thumbnail}
                                    teams={item.trackTeam}
                                    pathname={`/project/track/${29}/team/${item.trackTeamId}/board`}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="flex min-h-[200px] w-full items-center justify-center">
                    <p className="text-lg text-gray-500">
                        등록된 관통 프로젝트가 없습니다.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyTrackProjectList;
