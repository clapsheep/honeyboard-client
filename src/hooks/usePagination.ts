import { useState } from 'react';
import { useSearchParams } from 'react-router';

const usePagination = ({ size }: { size: number }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sizeState] = useState(size);
    const currentPage = Number(searchParams.get('page')) || 1;

    const handlePageChange = (newPage: number) => {
        setSearchParams((prev) => {
            prev.set('page', newPage.toString());
            return prev;
        });
    };
    return { handlePageChange, currentPage, sizeState };
};

export default usePagination;
