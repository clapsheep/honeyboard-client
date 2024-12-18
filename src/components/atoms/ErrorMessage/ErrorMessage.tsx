interface ErrorMessageProps {
    children: React.ReactNode;
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
    return <p className="text-text-sm text-error-500">{children}</p>;
};
export default ErrorMessage;
