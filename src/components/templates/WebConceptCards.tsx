import { ProjectCard } from '@/components/organisms';
import usePagination from '@/hooks/usePagination';
import { getWebConceptsAPI } from '@/services/study/web';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Pagination } from '../atoms';

interface WebConceptCardsProps {
    generationId?: string | null;
}

const WebConceptCards = ({ generationId }: WebConceptCardsProps) => {
    const {
        handlePageChange,
        currentPage: page,
        sizeState: size,
    } = usePagination({
        size: 8,
    });

    const { data } = useSuspenseQuery({
        queryKey: ['webConcepts', generationId, page, size],
        queryFn: () =>
            getWebConceptsAPI(generationId || null, page || 1, size || 8),
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
        <>
            <ul className="grid w-full grid-cols-4 gap-6">
                {data.content.map((item) => (
                    <li key={item.id}>
                        <ProjectCard
                            title={item.title}
                            subTitle={item.updatedAt}
                            id={item.id}
                            img={item.thumbnail}
                        />
                    </li>
                ))}
            </ul>
            <Pagination
                total={data.pageInfo.totalPages}
                now={page}
                onClickLeft={() => handlePageChange(Math.max(1, page - 5))}
                onClickRight={() =>
                    handlePageChange(
                        Math.min(data.pageInfo.totalPages, page + 5),
                    )
                }
                onClick={(e) =>
                    handlePageChange(Number(e.currentTarget.textContent))
                }
            />
        </>
    );
};

export default WebConceptCards;
