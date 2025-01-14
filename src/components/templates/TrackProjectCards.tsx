import { TrackProjectBoard } from '@/types/TrackProject';
import { ButtonPDF } from '../atoms';
import { ProjectCard } from '../organisms';
import { User } from '@/types/User';

interface TrackProjectCardsProps {
    boards?: (Pick<
        TrackProjectBoard,
        'id' | 'title' | 'createdAt' | 'thumbnail'
    > & {
        members: Pick<User, 'id' | 'name'>[];
    })[];
}

const TrackProjectCards = ({ boards }: TrackProjectCardsProps) => {
    const onClickPDF = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('PDF 다운로드', e);
    };

    return (
        <div className="flex w-full flex-col gap-6 p-6">
            <div className="flex w-full justify-end">
                <ButtonPDF onClick={onClickPDF}></ButtonPDF>
            </div>
            {boards && boards.length > 0 ? (
                <>
                    <ul className="grid min-w-[1400px] grid-cols-4 grid-rows-2 gap-6">
                        {boards.map((item) => (
                            <li key={item.id}>
                                <ProjectCard
                                    title={item.title}
                                    subTitle={item.createdAt}
                                    id={item.id}
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

export default TrackProjectCards;
