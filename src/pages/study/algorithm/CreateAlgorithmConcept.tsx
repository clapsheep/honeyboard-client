import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useLocation, useNavigate } from 'react-router';

const CreateAlgorithmConcept = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/algorithm');
    };
    const handleCreate = () => {
        console.log('글 작성');
    };
    return (
        <div>
            <Header
                titleProps={{ title: '글 작성' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleCreate}>글쓰기</Button>
                    </div>
                </div>
            </Header>
        </div>
    );
};

export default CreateAlgorithmConcept;
