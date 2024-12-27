import logo from '@/assets/images/logo.png';
import { Button } from '@/components/atoms';
import { InputForm } from '@/components/molecules';
import { EmailVerificationModal } from '@/components/organisms/';
import { sendEmailAPI, verifyEmailAPI } from '@/services/auth';
import { registerSchema, RegisterSchema } from '@/types/schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const SignUp = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors, isValid, touchedFields },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched',
        reValidateMode: 'onChange',
    });

    // Watch form values for validation
    const nameValue = watch('name');
    const emailValue = watch('email');
    const passwordValue = watch('password');
    const confirmPasswordValue = watch('confirmPassword');

    // Step progression handlers
    const handleNameStep = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const isNameValid = await trigger('name');
        if (isNameValid) {
            setCurrentStep(2);
        }
    };

    const handleEmailStep = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const isEmailValid = await trigger('email');
        if (isEmailValid) {
            try {
                const res = await sendEmailAPI(emailValue);
                if (res.status === 200) {
                    setIsModalOpen(true);
                }
            } catch (error) {
                console.error('Email verification error:', error);
            }
        }
    };

    const handleVerification = async (code: string) => {
        try {
            const res = await verifyEmailAPI(emailValue, code);
            if (res.status === 200) {
                setIsModalOpen(false);
                setIsEmailVerified(true);
                setCurrentStep(3);
            }
        } catch (error) {
            console.error('Email verification error:', error);
        }
        console.log('Verification code:', code);
    };

    const handlePasswordStep = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const isPasswordValid = await trigger('password');
        if (isPasswordValid) {
            setCurrentStep(4);
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        handler: (e: React.FormEvent) => Promise<void>,
        disabled: boolean,
    ) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!disabled) {
                handler(e);
            }
        }
    };

    const onSubmit = (data: RegisterSchema) => {
        if (isEmailVerified && isValid) {
            console.log(data);
            // TODO: Implement actual signup logic
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
                    회원가입
                </h1>
                <form
                    className="flex w-full flex-col items-center gap-6 py-3"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Name Step */}
                    <div
                        className={`w-full transform transition-all duration-500 ease-in-out ${currentStep >= 1 ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'} `}
                    >
                        <div className="flex w-full flex-col items-center gap-4">
                            <InputForm
                                id="name"
                                label="이름"
                                type="text"
                                errorMessage={
                                    touchedFields.name
                                        ? errors.name?.message
                                        : undefined
                                }
                                placeholder="이름을 입력해주세요"
                                onKeyDown={(e) =>
                                    handleKeyDown(
                                        e,
                                        handleNameStep,
                                        !nameValue || !!errors.name?.message,
                                    )
                                }
                                {...register('name')}
                            />
                            {currentStep === 1 && (
                                <Button
                                    type="button"
                                    onClick={handleNameStep}
                                    disabled={
                                        !nameValue || !!errors.name?.message
                                    }
                                >
                                    다음
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Email Step */}
                    <div
                        className={`w-full transform transition-all duration-500 ease-in-out ${currentStep >= 2 ? 'translate-y-0 opacity-100' : 'h-0 translate-y-4 overflow-hidden opacity-0'} `}
                    >
                        <div className="flex flex-col items-center gap-4">
                            <InputForm
                                id="email"
                                label="이메일"
                                type="email"
                                errorMessage={
                                    touchedFields.email
                                        ? errors.email?.message
                                        : undefined
                                }
                                placeholder="이메일을 입력해주세요"
                                readonly={isEmailVerified}
                                onKeyDown={(e) =>
                                    handleKeyDown(
                                        e,
                                        handleEmailStep,
                                        !emailValue || !!errors.email?.message,
                                    )
                                }
                                {...register('email')}
                            />
                            {currentStep === 2 && (
                                <Button
                                    type="button"
                                    onClick={handleEmailStep}
                                    disabled={
                                        !emailValue || !!errors.email?.message
                                    }
                                >
                                    인증코드 발송
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Password Step */}
                    <div
                        className={`w-full transform transition-all duration-500 ease-in-out ${currentStep >= 3 ? 'translate-y-0 opacity-100' : 'h-0 translate-y-4 overflow-hidden opacity-0'} `}
                    >
                        <div className="flex flex-col items-center gap-4">
                            <InputForm
                                id="password"
                                label="비밀번호"
                                type="password"
                                placeholder="8자 이상 + 영문 + 숫자"
                                errorMessage={
                                    touchedFields.password
                                        ? errors.password?.message
                                        : undefined
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(
                                        e,
                                        handlePasswordStep,
                                        !passwordValue ||
                                            !!errors.password?.message,
                                    )
                                }
                                {...register('password')}
                            />
                            {currentStep === 3 && (
                                <Button
                                    type="button"
                                    onClick={handlePasswordStep}
                                    disabled={
                                        !passwordValue ||
                                        !!errors.password?.message
                                    }
                                >
                                    다음
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Confirm Password Step */}
                    <div
                        className={`w-full transform transition-all duration-500 ease-in-out ${currentStep >= 4 ? 'translate-y-0 opacity-100' : 'h-0 translate-y-4 overflow-hidden opacity-0'} `}
                    >
                        <div className="flex flex-col items-center gap-4">
                            <InputForm
                                id="confirmPassword"
                                label="비밀번호 확인"
                                type="password"
                                placeholder="비밀번호 확인"
                                errorMessage={
                                    touchedFields.confirmPassword
                                        ? errors.confirmPassword?.message
                                        : undefined
                                }
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        const submitButton =
                                            document.querySelector(
                                                'button[type="submit"]',
                                            ) as HTMLButtonElement;
                                        if (
                                            submitButton &&
                                            !submitButton.disabled
                                        ) {
                                            submitButton.click();
                                        }
                                    }
                                }}
                                {...register('confirmPassword')}
                            />
                            {currentStep === 4 && (
                                <Button
                                    type="submit"
                                    disabled={
                                        !isEmailVerified ||
                                        !isValid ||
                                        !nameValue ||
                                        !emailValue ||
                                        !passwordValue ||
                                        !confirmPasswordValue ||
                                        !!errors.name?.message ||
                                        !!errors.email?.message ||
                                        !!errors.password?.message ||
                                        !!errors.confirmPassword?.message
                                    }
                                >
                                    회원가입
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
                <div className="flex flex-col items-center gap-3 py-6 text-text-md text-gray-700">
                    <span>
                        이미 회원이신가요?{' '}
                        <Link to="/login" className="font-medium underline">
                            로그인
                        </Link>
                    </span>
                </div>
                {isModalOpen && (
                    <EmailVerificationModal
                        email={emailValue}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleVerification}
                    />
                )}
            </div>
        </main>
    );
};

export default SignUp;
