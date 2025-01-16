import { ProjectCard } from '../organisms';
import { User } from '@/types/User';
import { FinaleProject } from '@/types/FinaleProject';

interface FinalListCardsProps {
    boards?: (Pick<
        FinaleProject,
        'id' | 'title' | 'createdAt' | 'thumbnail' | 'description'
    > & {
        teams: Pick<User, 'id' | 'name'>[]; // 팀 정보 추가
    })[];
}

const FinalListCards = ({ boards }: FinalListCardsProps) => {
    return (
        <div className="flex w-full flex-col gap-6 p-6">
            {boards && boards.length > 0 ? (
                <>
                    <ul className="grid min-w-[1400px] grid-cols-4 grid-rows-2 gap-6">
                        {boards.map((item) => (
                            <li key={item.id}>
                                <ProjectCard
                                    title={item.title}
                                    subTitle={item.description}
                                    id={item.id}
                                    img={item.thumbnail}
                                    teams={item.members}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="flex min-h-[200px] w-full items-center justify-center">
                    <p className="text-lg text-gray-500">
                        등록된 일지가 없습니다.
                    </p>
                </div>
            )}
        </div>
    );
};

export default FinalListCards;
