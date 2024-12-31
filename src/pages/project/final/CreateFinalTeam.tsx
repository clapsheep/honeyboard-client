import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useLocation, useNavigate } from 'react-router';

const CreateTrackProject = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/final');
    };
    const handleCreate = () => {
        console.log('팀 생성');
    };
    return (
        <div>
            <Header
                titleProps={{ title: '팀 생성' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleCreate}>팀 생성</Button>
                    </div>
                </div>
            </Header>
        </div>
    );
};

export default CreateTrackProject;
