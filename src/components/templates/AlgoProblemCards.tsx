import { AlgoProblemCard } from '../molecules';
import { getAlgorithmProblemsAPI } from '@/services/study/algorithm';
import { useSuspenseQuery } from '@tanstack/react-query';

interface AlgoProblemCardsProps {
    page?: number;
    size?: number;
}

const AlgoProblemCards = ({ page, size }: AlgoProblemCardsProps) => {
    const { data } = useSuspenseQuery({
        queryKey: ['algoProblems', page, size],
        queryFn: () => getAlgorithmProblemsAPI(page || 1, size || 16),
    });

    if (!data?.content?.length) {
        return (
            <div className="flex min-h-[200px] w-full items-center justify-center">
                <p className="text-lg text-gray-500">
                    등록된 알고리즘 문제가 없습니다.
                </p>
            </div>
        );
    }
    console.log(data);

    return (
        <ul className="grid w-full grid-cols-4 gap-6">
            {data.content.map((item) => (
                <li key={item.id}>
                    <AlgoProblemCard
                        id={item.id}
                        title={item.title}
                        description={item.updatedAt}
                        link={item.url}
                        tags={item.tags.map((tag) => tag.name)}
                    />
                </li>
            ))}
        </ul>
    );
};

export default AlgoProblemCards;
