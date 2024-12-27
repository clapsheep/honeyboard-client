import { Button } from '@/components/atoms';
import { useNavigate } from 'react-router';
import logo from '@/assets/images/logo.png';

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
            <figure className="flex items-center justify-center">
                <img src={logo} alt="HoneyBoard" />
            </figure>
            <div className="flex flex-col items-center gap-6 py-12">
                <h1 className="text-display-lg font-bold text-gray-900">404</h1>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-text-lg font-medium text-gray-700">
                        페이지를 찾을 수 없습니다
                    </p>
                    <p className="text-text-md text-gray-500">
                        요청하신 페이지가 삭제되었거나 잘못된 경로입니다
                    </p>
                </div>
                <Button onClick={() => navigate('/')} className="mt-4">
                    홈으로 돌아가기
                </Button>
            </div>
        </div>
    );
};

export default Error404;
