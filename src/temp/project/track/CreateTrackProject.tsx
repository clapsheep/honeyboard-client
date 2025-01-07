import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useLocation } from 'react-router';

const CreateTrackProject = () => {
    const { pathname } = useLocation();
    const handleCreateTrackProject = () => {
        console.log('프로젝트 생성');
    };
    return (
        <>
            <Header
                titleProps={{ title: '관통 프로젝트 생성' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <Button onClick={handleCreateTrackProject}>
                        프로젝트 생성
                    </Button>
                </div>
            </Header>
        </>
    );
};

export default CreateTrackProject;
