interface SubNavButtonProps {
    id: string;
    title: string;
    isActive: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SubNavButton = ({ id, title, isActive, onClick }: SubNavButtonProps) => {
    return (
        <button
            id={id}
            className={`flex items-center justify-start hover:font-semibold ${isActive ? 'border-r-[6px] border-r-blue-700 bg-blue-100 font-semibold' : 'bg-gray-200 font-normal hover:bg-bluegray-100'} h-10 w-60 flex-shrink-0 gap-2 pl-[68px] pr-2 text-text-md text-gray-900`}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default SubNavButton;
