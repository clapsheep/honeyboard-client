import { sendEmailAPI, verifyEmailAPI } from '@/api/authAPI';
import { Button } from '@/components/atoms';
import { InputForm } from '@/components/molecules';
import { EmailVerificationModal } from '@/components/organisms';
import { useState } from 'react';
import { Link } from 'react-router';
import logo from '/assets/images/logo.png';
import { submitKeyDownEnter } from '@/utils/submitKeyDownEnter';

const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [freeze, setFreeze] = useState(false);

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleSendEmail = async () => {
        const res = await sendEmailAPI(email);
        if (res.status === 200) {
            setIsModalOpen(true);
            setFreeze(true);
        }
    };
    const handleVerification = async (email: string, code: string) => {
        const res = await verifyEmailAPI(email, code);
        if (res.status === 200) {
            setIsModalOpen(false);
        }
    };
    const handleChangePassword = async () => {
        const res = await changePasswordAPI(email, password);
        if (res.status === 200) {
            navigate('/login');
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
                    비밀번호 변경
                </h1>

                <form
                    className="flex w-full flex-col items-center gap-6 py-3"
                    onSubmit={() => {}}
                >
                    <div className="w-full translate-y-0 transform opacity-100 transition-all duration-500 ease-in-out">
                        <div className="flex flex-col items-center gap-4">
                            <InputForm
                                disabled={freeze}
                                id="email"
                                label="이메일"
                                type="email"
                                placeholder="이메일을 입력해주세요"
                                value={email}
                                onChange={handleEmailInput}
                            />

                            {!freeze && (
                                <Button type="button" onClick={handleSendEmail}>
                                    인증코드 발송
                                </Button>
                            )}
                        </div>
                    </div>
                    {freeze && (
                        <div>
                            <div className="flex flex-col gap-4">
                                <InputForm
                                    id="password"
                                    label="비밀번호"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="8자 이상 + 영문 + 숫자"
                                    errorMessage={undefined}
                                />
                                <InputForm
                                    id="confirmPassword"
                                    label="비밀번호 확인"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    placeholder="비밀번호 확인"
                                    errorMessage={undefined}
                                    onKeyDown={submitKeyDownEnter}
                                />
                            </div>
                            <Button type="submit">비밀번호 변경</Button>
                        </div>
                    )}
                </form>
                <div className="flex flex-col items-center gap-3 py-6 text-text-md text-gray-700">
                    <span>
                        회원이 아니신가요?{' '}
                        <Link to="/signup" className="font-medium underline">
                            회원가입
                        </Link>
                    </span>
                    <div>
                        <Link to="/login" className="font-medium underline">
                            로그인 하러가기
                        </Link>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <EmailVerificationModal
                    email={email}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleVerification}
                />
            )}
        </main>
    );
};

export default ChangePassword;
