import Icon from '../Icon/Icon';

interface SocialLoginButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'google' | 'naver';
}

const SocialLoginButton = ({
    onClick,
    type = 'google',
}: SocialLoginButtonProps) => {
    const iconId = type === 'google' ? 'google-icon' : 'naver-icon';
    const buttonText = type === 'google' ? 'Google' : 'NAVER';
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-text-md font-medium text-gray-700"
        >
            <Icon id={iconId}></Icon>
            {buttonText} Login
        </button>
    );
};

export default SocialLoginButton;
