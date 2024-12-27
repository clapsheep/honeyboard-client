import logo from '/assets/images/logo.png';
import { Button, ErrorMessage } from '@/components/atoms';
import { InputForm } from '@/components/molecules';
import { OAuthAPI, OAuthDomainType } from '@/services/auth';
import { additionalInfoSchema, type AdditionalInfoSchema } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Navigate, useParams } from 'react-router';

const AdditionalInfoOAuth = () => {
    const { domain } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<AdditionalInfoSchema>({
        resolver: zodResolver(additionalInfoSchema),
    });

    // domain 유효성 검사
    if (!domain || !['google', 'naver', 'kakao'].includes(domain)) {
        return <Navigate to="/login" replace />;
    }

    const onSubmit: SubmitHandler<AdditionalInfoSchema> = async ({ name }) => {
        try {
            await OAuthAPI(domain as OAuthDomainType, name);
        } catch {
            setError('root', {
                message: '추가 정보 입력에 실패했습니다',
            });
        }
    };

    const onError = () => {
        setError('root', {
            message: '이름을 확인해주세요',
        });
    };

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
            <figure className="flex items-center justify-center">
                <img src={logo} alt="HoneyBoard" />
            </figure>
            <h1 className="py-6 text-display-md font-bold text-gray-900">
                추가 정보 입력
            </h1>
            <form
                className="flex flex-col items-center gap-6 py-3"
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <InputForm
                    id="name"
                    label="이름"
                    type="text"
                    placeholder="이름을 입력해주세요"
                    {...register('name')}
                />
                {(errors.root || errors.name) && (
                    <ErrorMessage>
                        {errors.root?.message || errors.name?.message}
                    </ErrorMessage>
                )}
                <Button type="submit">완료</Button>
            </form>
        </div>
    );
};

export default AdditionalInfoOAuth;
