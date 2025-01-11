import { api } from '@/services/common/axiosInstance';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const { VITE_BASE_API } = import.meta.env;

export const useAllFinalBoard = (generationId?: string) => {
    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await api.get(
                    `${VITE_BASE_API}/project/finale?generation=${generationId}`,
                );
                setData(response.data);
            } catch (error) {
                setError(`피날레 전체 조회 에러 ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [generationId]);

    return { data, loading, error };
};

export const useTodaySubmit = (
    projectId: string,
    generationId?: string,
    date?: string,
) => {
    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response: AxiosResponse = await api.get(
                    `${VITE_BASE_API}/project/finale/${projectId}/status?generation=${generationId}&date=${date}`,
                );
                setData(response.data);
            } catch (error) {
                setError(`error: ${error}`);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [projectId, generationId, date]);

    return { data, loading, error };
};

export const useRemainingUsers = (generationId?: string) => {
    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response: AxiosResponse = await api.get(
                    `${VITE_BASE_API}/project/finale/team/remaining?generation=${generationId}`,
                );
                setData(response.data);
            } catch (error) {
                setError(`error: ${error}`);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [generationId]);

    return { data, loading, error };
};
