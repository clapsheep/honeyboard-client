import { useMemo } from 'react';
import Icon from '../Icon/Icon';

interface PaginationProps {
    total: number;
    now: number;
    onClickLeft: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onClickRight: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Pagination = ({
    total,
    now,
    onClickLeft,
    onClickRight,
    onClick,
}: PaginationProps) => {
    const maxVisible = 5;

    const pageNumbers = useMemo(() => {
        const pages = [];

        const start = Math.max(
            1,
            Math.min(now - Math.floor(maxVisible / 2), total - maxVisible + 1),
        );
        const finish = Math.min(total, start + maxVisible - 1);

        for (let i = start; i <= finish; i++) {
            pages.push(i);
        }

        return pages;
    }, [total, now]);

    const PAGE_COLOR = {
        current: 'bg-blue-600 text-white',
        other: 'bg-gray-200 text-gray-500',
    };

    return (
        <section className="absolute bottom-12 flex gap-4">
            <button
                onClick={onClickLeft}
                aria-label="5페이지 이전"
                disabled={now === 1}
                className="flex h-8 w-8 items-center justify-center bg-blue-100 disabled:bg-gray-200"
            >
                <Icon id="pagination-arrow-left"></Icon>
            </button>
            <ul className="flex gap-4">
                {pageNumbers.map((number) => (
                    <li key={number} data-index={number} className="">
                        <button
                            onClick={onClick}
                            className={`h-8 w-8 ${number == now ? PAGE_COLOR.current : PAGE_COLOR.other}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
            <button
                onClick={onClickRight}
                aria-label="5페이지 다음"
                disabled={now > total - maxVisible}
                className="flex h-8 w-8 items-center justify-center bg-blue-100 disabled:bg-gray-200"
            >
                <Icon id="pagination-arrow-right"></Icon>
            </button>
        </section>
    );
};

export default Pagination;
