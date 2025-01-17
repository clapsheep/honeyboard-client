import { useEffect, useState } from 'react';

interface useProjectDetailProps<U, T> {
    getAPI: (req: U) => Promise<T>;
    requestParam: U | undefined;
}

export const useProjectDetail = <U, T>({
    getAPI,
    requestParam,
}: useProjectDetailProps<U, T>) => {
    const [data, setData] = useState<T>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!requestParam) {
                    return;
                }

                const response = await getAPI(requestParam);
                setData(response.data);
            } catch (error) {
                console.error('프로젝트 조회에 실패했습니다.', error);
            }
        };

        fetchData();
    }, []);

    return data;
};
