import { sendEmailAPI } from '@/api/authAPI';
import { ModalButton } from '@/components/atoms';
import { useEffect, useRef, useState } from 'react';

interface EmailVerificationModalProps {
    email: string;
    onClose: () => void;
    onSubmit: (email: string, code: string) => void;
}

const EmailVerificationModal = ({
    email,
    onClose,
    onSubmit,
}: EmailVerificationModalProps) => {
    const [code, setCode] = useState(['', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // 모달이 열리면 첫 번째 입력란에 포커스
        inputRefs.current[0]?.focus();
    }, []);

    const handleInputChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // 숫자를 입력하면 다음 입력란으로 포커스 이동
            if (value !== '' && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === 'Backspace' && code[index] === '' && index > 0) {
            // 백스페이스를 누르고 현재 입력란이 비어있으면 이전 입력란으로 이동
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        const fullCode = code.join('');
        if (fullCode.length === 4) {
            onSubmit(email, fullCode);
        }
    };

    const handleResendCode = async () => {
        setIsLoading(true);
        const res = await sendEmailAPI(email);
        if (res.status === 200) {
            setCode(['', '', '', '']);
            setIsLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="rounded-lg bg-white p-6 shadow-lg">
                {isLoading ? (
                    <div className="flex h-[300px] w-[300px] flex-col items-center justify-center">
                        <img
                            src="/assets/loading/spinner.svg"
                            className="h-1/2 w-1/2 [filter:invert(40%)_sepia(98%)_saturate(2000%)_hue-rotate(190deg)_brightness(94%)_contrast(97%)]"
                            alt="로딩중"
                        />
                        <span className="p-5 text-text-lg font-semibold">
                            이메일 재발송 중입니다.
                        </span>
                    </div>
                ) : (
                    <>
                        <h2 className="mb-1 text-center text-text-lg font-semibold">
                            인증 코드 입력
                        </h2>
                        <p className="mb-5 text-center text-text-sm text-gray-600">
                            <strong>{email}</strong>로<br /> 전송된 4자리 인증
                            코드를 입력해주세요
                        </p>
                        <div className="mb-3 flex justify-center space-x-3">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) =>
                                        (inputRefs.current[index] = el)
                                    }
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) =>
                                        handleInputChange(index, e.target.value)
                                    }
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="h-20 w-20 rounded-lg border border-gray-400 text-center text-display-md font-medium text-blue-700 focus:border-4 focus:border-bluegray-300 focus:outline-none"
                                />
                            ))}
                        </div>
                        <div>
                            <p className="mb-8 text-center text-text-sm text-gray-600">
                                코드가 도착하지 않았나요?{' '}
                                <button
                                    onClick={handleResendCode}
                                    type="button"
                                    className="font-semibold"
                                >
                                    재발송
                                </button>
                            </p>
                        </div>
                        <div className="flex justify-center space-x-2">
                            {/* 모달 버튼 제작 시 추후 수정 */}
                            <ModalButton
                                type="button"
                                action="confirm"
                                onClick={handleSubmit}
                                disabled={!code.every((digit) => digit !== '')}
                            />
                            <ModalButton
                                type="button"
                                action="cancel"
                                onClick={onClose}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
export default EmailVerificationModal;
