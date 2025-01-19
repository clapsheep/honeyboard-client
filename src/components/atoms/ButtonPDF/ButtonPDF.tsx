interface ButtonPDFProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

const ButtonPDF = ({ onClick, disabled = false }: ButtonPDFProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`rounded-sm border border-gray-600 bg-gray-25 px-4 py-1 text-text-md font-semibold text-gray-900`}
        >
            PDF 다운로드
        </button>
    );
};

export default ButtonPDF;
