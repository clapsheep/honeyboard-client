import logo from '@/assets/images/logo.png';
import { Button, ErrorMessage, SocialLoginButton } from '@/components/atoms';
import { InputForm } from '@/components/molecules';
import { loginAPI, requestOAuthAPI } from '@/services/auth/authAPI';
import { loginSchema, type LoginSchema } from '@/types/schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
        try {
            await loginAPI(data);
            //todo 로그인 성공 시, 반환값 전역상태에 저장 및 이동
        } catch {
            setError('root', {
                message: '이메일 또는 비밀번호를 확인해주세요',
            });
        }
    };

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
            <figure className="flex items-center justify-center">
                <img src={logo} alt="HoneyBoard" />
            </figure>
            <h1 className="py-6 text-display-md font-bold text-gray-900">
                로그인
            </h1>
            <div className="flex gap-3 pb-6">
                <SocialLoginButton
                    type="google"
                    onClick={() => requestOAuthAPI('google')}
                />
                <SocialLoginButton
                    type="naver"
                    onClick={() => requestOAuthAPI('naver')}
                />
            </div>
            <form
                className="flex flex-col items-center gap-6 py-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <InputForm
                    id="email"
                    label="이메일"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    {...register('email')}
                />
                <InputForm
                    id="password"
                    label="비밀번호"
                    placeholder="8자 이상 + 영문 + 숫자"
                    type="password"
                    {...register('password')}
                />
                {(errors.email || errors.password || errors.root) && (
                    <ErrorMessage>
                        {errors.email?.message ||
                            errors.password?.message ||
                            errors.root?.message}
                    </ErrorMessage>
                )}
                <Button type="submit">로그인</Button>
            </form>
            <div className="flex flex-col items-center gap-3 py-6 text-text-md text-gray-700">
                <span>
                    회원이 아니신가요?{' '}
                    <Link to="/signup" className="font-medium underline">
                        회원가입
                    </Link>
                </span>
                <Link to="/find-password" className="font-medium underline">
                    비밀번호 찾기
                </Link>
            </div>
        </div>
    );
};

export default Login;
