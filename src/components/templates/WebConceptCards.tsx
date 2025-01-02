import { ProjectCard } from '@/components/organisms';
import { getWebConceptsAPI } from '@/services/study/web';
import { useSuspenseQuery } from '@tanstack/react-query';

interface WebConceptCardsProps {
    generationId?: string | null;
    page?: number;
    size?: number;
}

const WebConceptCards = ({
    generationId,
    page,
    size,
}: WebConceptCardsProps) => {
    console.log(generationId);

    const { data } = useSuspenseQuery({
        queryKey: ['webConcepts', generationId, page, size],
        queryFn: () =>
            getWebConceptsAPI(generationId || null, page || 1, size || 16),
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

export default WebConceptCards;
