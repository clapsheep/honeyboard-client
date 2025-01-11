import { useAuth } from './useAuth';
import { getTrackProjectListAPI } from '@/api/trackAPI';
import { useSuspenseQuery } from '@tanstack/react-query';

const useTrackProjectList = () => {
    const { userInfo } = useAuth();
    const generationId = userInfo?.generationId ?? '';
    console.log(generationId);
    // useSuspenseQuery를 이용해 데이터 가져오기
    const { data } = useSuspenseQuery({
        queryKey: ['trackProjects', generationId], // queryKey
        queryFn: () => getTrackProjectListAPI({ generationId }),
    });

    return { data };
};

export default useTrackProjectList;
