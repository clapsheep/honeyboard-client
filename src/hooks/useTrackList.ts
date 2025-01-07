import { useEffect, useState } from 'react';
import axios from 'axios';
import { trackBoard } from '@/types/project/track/types';
const { VITE_BASE_API } = import.meta.env;
const useTrackList = (generationId: string | null) => {
    const [data, setData] = useState<trackBoard[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<trackBoard[]>(
                    `${VITE_BASE_API}/project/track?generation=${generationId}`,
                );
                console.log(response);
                setData(response.data);
            } catch (error) {
                console.log(`error: ${error}`);
            }
        };

        fetchData();
    }, [generationId]);

    return data;
};

export default useTrackList;
