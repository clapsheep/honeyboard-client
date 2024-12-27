import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('올바른 이메일 형식이 아닙니다'),
    password: z
        .string()
        .min(8, '비밀번호는 8자 이상이어야 합니다')
        .regex(/[a-zA-Z]/, '영문을 포함해야 합니다')
        .regex(/[0-9]/, '숫자를 포함해야 합니다'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(2, '이름은 2글자 이상이어야 합니다.')
            .max(50, '이름은 50글자 이하여야 합니다.'),
        email: z.string().email('올바른 이메일 형식이 아닙니다.'),
        password: z
            .string()
            .min(8, '비밀번호는 8자 이상이어야 합니다.')
            .regex(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                '비밀번호는 영문과 숫자를 포함해야 합니다.',
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword'],
    });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const additionalInfoSchema = z.object({
    name: z.string().min(1, '이름을 입력해주세요'),
});

export type AdditionalInfoSchema = z.infer<typeof additionalInfoSchema>;
