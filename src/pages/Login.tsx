import logo from '/assets/images/logo.png';
import { Button, ErrorMessage, SocialLoginButton } from '@/components/atoms';
import { InputForm } from '@/components/molecules';
import { loginAPI, requestOAuth } from '@/services/auth';
import { loginSchema, type LoginSchema } from '@/types/auth';
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
        <main className="mx-auto flex h-screen w-full min-w-[418px] items-center justify-center bg-gray-50">
            <div className="flex w-[418px] flex-col items-center justify-center">
                <figure className="w-full">
                    <img
                        src={logo}
                        alt="HoneyBoard"
                        className="h-auto w-full object-contain"
                    />
                </figure>
                <h1 className="py-6 text-display-md font-bold text-gray-900">
                    로그인
                </h1>
                <div className="flex gap-3 pb-6">
                    <SocialLoginButton
                        type="google"
                        onClick={() => requestOAuth('google')}
                    />
                    <SocialLoginButton
                        type="naver"
                        onClick={() => requestOAuth('naver')}
                    />
                </div>
                <form
                    className="flex w-full flex-col items-center gap-6 py-3"
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
        </main>
    );
};

export default Login;
