import { createTrackProjectAPI } from '@/api/trackAPI';
import TrackProject from '@/components/templates/TrackProject';
import { useAuth } from '@/hooks/useAuth';
import { useCreateTrackProject } from '@/hooks/useTrackProject';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const TrackProjectCreate = () => {
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (userInfo?.role != 'ADMIN') {
            navigate(-1);
        }
    });

    const props = useCreateTrackProject();

    const { title, objective, description, weedingMember } = props;

    const handleForm = async () => {
        const trackData = {
            title: title,
            objective: objective,
            description: description,
            excludedMembers: weedingMember.map((member) => Number(member.id)),
        };

        try {
            const res = await createTrackProjectAPI(trackData);

            navigate(`/project/track/${res.data.id}`);
        } catch (error) {
            setModalOpen(true);
            console.error('에러 발생', error);
        }
    };

    return (
        <TrackProject
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            mode="create"
            handleForm={handleForm}
            {...props}
        ></TrackProject>
    );
};

export default TrackProjectCreate;
