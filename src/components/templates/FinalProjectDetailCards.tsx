import {
    FinaleProjectBoard,
} from '@/types/FinaleProject';
import { ButtonPDF } from '../atoms';
import { ProjectCard } from '../organisms';

interface FinalProjectDetailCardsProps {
    boards: Pick<
        FinaleProjectBoard,
        'id' | 'title' | 'createdAt' | 'thumbnail'
    >[];
    finaleProjectId: string;
}

const FinalProjectDetailCards = ({
    boards,
    finaleProjectId,
}: FinalProjectDetailCardsProps) => {
    const onClickPDF = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('PDF 다운로드', e);
    };

    return (
        <div className="flex w-full flex-col gap-6 p-6">
            <div className="flex w-full justify-end">
                <ButtonPDF onClick={onClickPDF}></ButtonPDF>
            </div>
            {boards && boards.length > 0 ? (
                <ul className="grid min-w-[1400px] grid-cols-4 grid-rows-2 gap-6">
                    {boards.map((board) => (
                        <li key={board.id}>
                            <ProjectCard
                                title={board.title}
                                subTitle={board.createdAt}
                                id={board.id}
                                img={board.thumbnail}
                                pathname={`/project/final/${finaleProjectId}/board`}
                            />
                        </li>
                    ))}
                </ul>
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

export default FinalProjectDetailCards;
