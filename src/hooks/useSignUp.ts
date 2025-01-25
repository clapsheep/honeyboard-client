import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, registerSchema } from '@/types/auth';
import {
    sendEmailAPI,
    signupAPI,
    verifyEmailAPI,
    validationEmailAPI,
} from '@/api/authAPI';
import { AxiosError } from 'axios';

export const useSignUp = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        setError,
        formState: { errors, isValid, touchedFields },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched',
        reValidateMode: 'onChange',
    });

    const nameValue = watch('name');
    const emailValue = watch('email');
    const passwordValue = watch('password');
    const confirmPasswordValue = watch('confirmPassword');

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
        if (isEmailValid && !errors.email) {
            try {
                // 이메일 중복 확인
                const validationResponse = await validationEmailAPI(emailValue);
                if (validationResponse.status === 200) {
                    // 이메일 인증 요청
                    const res = await sendEmailAPI(emailValue);
                    if (res.status === 200) {
                        setIsModalOpen(true); // 모달 열기
                    }
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 409) {
                        // 중복된 이메일 에러 처리
                        setError('email', {
                            type: 'manual',
                            message: '이미 가입된 이메일입니다.',
                        });
                    } else {
                        // 기타 Axios 에러
                        console.error('Axios error:', error.message);
                    }
                } else {
                    // Axios 외의 에러 처리
                    console.error('Unexpected error:', error);
                }
            }
        }
    };

    const handleVerification = async (email: string, code: string) => {
        try {
            const res = await verifyEmailAPI(email, code);
            if (res.status === 200) {
                setIsModalOpen(false);
                setIsEmailVerified(true);
                setCurrentStep(3);
            }
        } catch (error) {
            console.error('Email verification error:', error);
        }
    };

    const handlePasswordStep = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const isPasswordValid = await trigger('password');
        if (isPasswordValid && !errors.password) {
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

    const onSubmit = async (data: RegisterSchema) => {
        if (isEmailVerified && isValid) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { confirmPassword, ...newData } = data;
                const res = await signupAPI(newData);
                if (res.status === 201) {
                    navigate('/login');
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    return {
        currentStep,
        isEmailVerified,
        isModalOpen,
        register,
        handleSubmit,
        errors,
        touchedFields,
        nameValue,
        emailValue,
        passwordValue,
        confirmPasswordValue,
        handleNameStep,
        handleEmailStep,
        handleVerification,
        handlePasswordStep,
        handleKeyDown,
        onSubmit,
        setIsModalOpen,
        isValid,
    };
};
