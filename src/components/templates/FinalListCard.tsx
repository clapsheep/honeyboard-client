import { ProjectCard } from '../organisms';
import { User } from '@/types/User';
import { FinaleProject } from '@/types/FinaleProject';
import { useLocation } from 'react-router';

interface FinalListCardsProps {
    boards?: (Pick<
        FinaleProject,
        'id' | 'title' | 'createdAt' | 'thumbnail' | 'description'
    > & {
        members: Pick<User, 'id' | 'name'>[]; // 팀 정보 추가
    })[];
}

const FinalListCards = ({ boards }: FinalListCardsProps) => {
    const { pathname } = useLocation();
    console.log(boards);

    return (
        <div className="flex w-full flex-col items-center gap-6 p-6">
            {boards && boards.length > 0 ? (
                <ul className="grid min-w-[1400px] grid-cols-4 grid-rows-2 gap-6 px-6">
                    {boards.map((item) => (
                        <li key={item.id}>
                            <ProjectCard
                                title={item.title}
                                subTitle={item.description}
                                id={item.id}
                                img={item.thumbnail}
                                teams={item.members}
                                pathname={pathname}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex min-h-[200px] w-full items-center justify-center">
                    <p className="items-center justify-center text-center text-lg text-gray-500">
                        등록된 파이널 보드가 없습니다.
                    </p>
                </div>
            )}
        </div>
    );
};

export default FinalListCards;
