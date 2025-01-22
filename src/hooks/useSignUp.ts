import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, registerSchema } from '@/types/auth';
import { sendEmailAPI, signupAPI, verifyEmailAPI } from '@/api/authAPI';

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
        if (isNameValid && !errors.name) {
            setCurrentStep(2);
        }
    };

    const handleEmailStep = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const isEmailValid = await trigger('email');
        if (isEmailValid && !errors.email) {
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
