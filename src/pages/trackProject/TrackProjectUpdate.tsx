import {
    getTrackProjectDetailAPI,
    getTrackProjectExcludeMembersAPI,
    updateTrackProjectAPI,
} from '@/api/trackAPI';
import TrackProject from '@/components/templates/TrackProject';
import { useAuth } from '@/hooks/useAuth';
import { useCreateTrackProject } from '@/hooks/useTrackProject';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const TrackProjectUpdate = () => {
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const { trackProjectId } = useParams();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (userInfo?.role != 'ADMIN') {
            navigate(-1);
        }
    });

    const props = useCreateTrackProject();

    const {
        title,
        objective,
        description,
        weedingMember,
        setTitle,
        setWeedingMember,
        setObjective,
        setDescription,
    } = props;

    // 보류
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!trackProjectId) {
                    return;
                }

                const data = await getTrackProjectDetailAPI(trackProjectId);

                setTitle(data.title);
                setObjective(data.objective);
                setDescription(data.description);
            } catch (error) {
                console.error('프로젝트 조회에 실패했습니다.', error);
            }
        };

        fetchData();

        const getExcludeMember = async () => {
            try {
                if (!trackProjectId) {
                    return;
                }

                const data = await getTrackProjectExcludeMembersAPI({
                    trackProjectId,
                });

                setWeedingMember([...data]);
            } catch (error) {
                console.error('제외 유저 조회에 실패했습니다.', error);
            }
        };

        getExcludeMember();
    }, []);

    const handleForm = async () => {
        if (!trackProjectId) {
            return;
        }

        const trackData = {
            title: title,
            objective: objective,
            description: description,
            excludedMembers: weedingMember.map((member) => Number(member.id)),
        };

        try {
            await updateTrackProjectAPI({
                trackProjectId: trackProjectId,
                data: trackData,
            });

            navigate(`/project/track/${trackProjectId}`);
        } catch (error) {
            setModalOpen(true);
            console.error('에러 발생', error);
        }
    };

    return (
        <TrackProject
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            mode="edit"
            handleForm={handleForm}
            {...props}
        ></TrackProject>
    );
};

export default TrackProjectUpdate;
