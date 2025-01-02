import { ProjectCard } from '@/components/organisms';
import { getAlgorithmConceptsAPI } from '@/services/study/algorithm';
import { useUserStore } from '@/stores/userStore';
import { useSuspenseQuery } from '@tanstack/react-query';

interface AlgorithmConceptCardsProps {
    generationId?: string;
    page?: number;
    size?: number;
}

const AlgorithmConceptCards = ({
    generationId,
    page,
    size,
}: AlgorithmConceptCardsProps) => {
    const { userInfo } = useUserStore();
    const { data } = useSuspenseQuery({
        queryKey: ['AlgorithmConcepts', generationId, page, size],
        queryFn: () =>
            getAlgorithmConceptsAPI(
                generationId || userInfo!.generationId,
                page || 1,
                size || 16,
            ),
    });

    if (!data?.content?.length) {
        return (
            <div className="flex min-h-[200px] w-full items-center justify-center">
                <p className="text-lg text-gray-500">
                    등록된 컨셉 프로젝트가 없습니다.
                </p>
            </div>
        );
    }

    return (
        <ul className="grid w-full grid-cols-4 gap-6">
            {data.content.map((item) => (
                <li key={item.id}>
                    <ProjectCard
                        title={item.title}
                        subTitle={item.updatedAt}
                        id={item.id}
                        img={item.thumbnailUrl}
                    />
                </li>
            ))}
        </ul>
    );
};

export default AlgorithmConceptCards;
