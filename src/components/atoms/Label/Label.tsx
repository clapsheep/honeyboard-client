interface LabelProps {
    text: string;
    htmlFor: string;
    required?: boolean;
    className?: string;
}
const Label = ({ text, htmlFor, required, className }: LabelProps) => {
    return (
        <label
            className={`text-text-lg font-semibold text-gray-900 ${className}`}
            htmlFor={htmlFor}
        >
            {text}
            {required && <span className="text-red-500">*</span>}
        </label>
    );
};
export default Label;
