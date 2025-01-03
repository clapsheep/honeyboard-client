import { useEffect, useState } from 'react';
import axios from 'axios';
import { trackBoard } from '@/types/project/track/types';

const useTrackList = (generationId: string | null) => {
    const [data, setData] = useState<trackBoard | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/v1/project/track?generation=${generationId}`,
                );
                setData(response.data);
            } catch (error) {
                console.log(`error: ${error}`);
            }
        };

        fetchData();
    }, [generationId]);

    return { data };
};

export default useTrackList;
