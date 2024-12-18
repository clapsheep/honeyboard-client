interface LabelProps {
    text: string;
    htmlFor: string;
}
const Label = ({ text, htmlFor }: LabelProps) => {
    return (
        <label
            className="text-text-lg font-semibold text-gray-900"
            htmlFor={htmlFor}
        >
            {text}
        </label>
    );
};
export default Label;
