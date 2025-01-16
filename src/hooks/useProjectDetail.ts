import { useEffect, useState } from 'react';

interface useProjectListProps<U, T> {
    getListAPI: (req: U) => Promise<T>;
    requestParam: U | undefined;
}

export const useProjectDetail = <U, T>({
    getListAPI,
    requestParam,
}: useProjectListProps<U, T>) => {
    const [data, setData] = useState<T>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!requestParam) {
                    return;
                }

                const response = await getListAPI(requestParam);
                setData(response);
            } catch (error) {
                console.error('프로젝트 리스트 조회에 실패했습니다.', error);
            }
        };

        fetchData();
    }, [getListAPI, requestParam]);

    return data;
};
