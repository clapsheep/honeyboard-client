interface SubNavButtonProps {
    id: string;
    title: string;
    isActive: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SubNavButton = ({ id, title, isActive, onClick }: SubNavButtonProps) => {
    return (
        <div
            className={`group flex items-center hover:font-semibold ${isActive ? 'bg-blue-100 font-semibold' : 'bg-gray-200 font-normal'}`}
        >
            <button
                id={id}
                className="h-10 w-60 flex-shrink-0 gap-2 pl-[68px] pr-2 text-text-md text-gray-900 group-hover:bg-bluegray-100"
                onClick={onClick}
            >
                {title}
            </button>

            <span
                className={`inline-block h-10 w-[6px] flex-shrink-0 ${isActive ? 'bg-blue-500' : 'bg-gray-100'} group-hover:bg-gray-200`}
            ></span>
        </div>
    );
};

export default SubNavButton;
