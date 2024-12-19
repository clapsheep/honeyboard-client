interface TabButtonProps {
    name: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // 클릭 이벤트 핸들러
    isActive?: boolean;
}

const TabButton = ({ name, onClick, isActive }: TabButtonProps) => {
    return (
        <button
            onClick={onClick}
            aria-selected={isActive}
            className={`border-b-2 text-text-md font-semibold ${
                isActive
                    ? 'border-blue-500 text-blue-500'
                    : 'border-gray-500 text-gray-500'
            }`}
        >
            {name}
        </button>
    );
};

export default TabButton;
