import { getTrackProjectDetailAPI } from '@/api/trackAPI';
import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import {
    ProjectCardSkeletonList,
    TrackProjectCards,
} from '@/components/templates';
import { TrackProjectDetailResponse } from '@/types/TrackProject';
import { Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

const TrackProjectDetail = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { trackProjectId } = useParams();
    const [data, setData] = useState<TrackProjectDetailResponse>();

    useEffect(() => {
        if (!trackProjectId) {
            return;
        }

        const fetchData = async () => {
            try {
                const response = await getTrackProjectDetailAPI({
                    trackProjectId,
                });
                setData(response);
            } catch (error) {
                console.error('트랙 프로젝트 조회에 실패했습니다.', error);
            }
        };

        fetchData();
    }, [trackProjectId]);

    return (
        <>
            <Header
                titleProps={{ title: data?.title }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex items-end justify-end gap-4">
                    <Button
                        color="red"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        프로젝트 삭제
                    </Button>
                    <Button
                        onClick={() => {
                            navigate('edit');
                        }}
                    >
                        프로젝트 수정
                    </Button>
                    <Button
                        onClick={() => {
                            navigate('create');
                        }}
                    >
                        일지 작성
                    </Button>
                </div>
            </Header>
            <Suspense fallback={<ProjectCardSkeletonList />}>
                <TrackProjectCards boards={data?.boards}></TrackProjectCards>
            </Suspense>
        </>
    );
};

export default TrackProjectDetail;
