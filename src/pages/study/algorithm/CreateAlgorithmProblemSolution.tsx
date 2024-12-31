import { Button } from '@/components/atoms';
import { Header } from '@/components/organisms';
import { useLocation, useNavigate } from 'react-router';

const CreateAlgorithmProblemSolution = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(-1);
    };
    const handleCreate = () => {
        console.log('문제 생성');
    };
    return (
        <div>
            <Header
                titleProps={{ title: '풀이 작성' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex justify-between">
                    <div>{'알고리즘 메모리 시간 랭귀지 입력칸'}</div>
                    <div className="flex gap-4">
                        <Button color="red" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleCreate}>풀이 작성</Button>
                    </div>
                </div>
            </Header>
        </div>
    );
};

export default CreateAlgorithmProblemSolution;
