import { PDFDownloadLink } from '@react-pdf/renderer';

const ButtonPDF = ({
    document,
    fileName,
}: {
    document: React.ReactElement;
    fileName: string;
}) => {
    return (
        <PDFDownloadLink
            document={document}
            fileName={fileName}
            className={`rounded-sm border border-gray-600 bg-gray-25 px-4 py-1 text-text-md font-semibold text-gray-900`}
        >
            PDF 다운로드
        </PDFDownloadLink>
    );
};

export default ButtonPDF;
