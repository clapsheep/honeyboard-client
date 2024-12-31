import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useLocation, useNavigate } from 'react-router';

const CreateWebRecommend = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('-1');
    };
    const handleCreate = () => {
        console.log('문제 생성');
    };
    return (
        <div>
            <Header
                titleProps={{ title: '게시글 작성' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-end">
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleCreate}>게시글 작성</Button>
                    </div>
                </div>
            </Header>
        </div>
    );
};

export default CreateWebRecommend;
