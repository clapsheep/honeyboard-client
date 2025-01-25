import { TrackProjectBoardDetailResponse } from '@/types/TrackProject';
import convertDate from '@/utils/convertDate';
import { parseMarkdown } from '@/utils/pdf/parseMarkdown';
import PDFStyles from '@/utils/pdf/pdfStyles';
import { Document, Font, Link, Page, Text, View } from '@react-pdf/renderer';
import NotoSansKRBold from '/assets/fonts/NotoSansKR-Bold.ttf';
import NotoSansExtraBold from '/assets/fonts/NotoSansKR-ExtraBold.ttf';
import NotoSansExtraLight from '/assets/fonts/NotoSansKR-ExtraLight.ttf';
import NotoSansLight from '/assets/fonts/NotoSansKR-Light.ttf';
import NotoSansKRMedium from '/assets/fonts/NotoSansKR-Medium.ttf';
import NotoSansKRRegular from '/assets/fonts/NotoSansKR-Regular.ttf';
import NotoSansKRSemiBold from '/assets/fonts/NotoSansKR-SemiBold.ttf';
import NotoSansKRThin from '/assets/fonts/NotoSansKR-Thin.ttf';

Font.register({
    family: 'NotoSansKR',
    fonts: [
        { src: NotoSansKRRegular, fontWeight: 400 },
        { src: NotoSansKRRegular, fontWeight: 400, fontStyle: 'italic' },
        { src: NotoSansKRMedium, fontWeight: 500 },
        { src: NotoSansKRBold, fontWeight: 700 },
        { src: NotoSansKRSemiBold, fontWeight: 600 },
        { src: NotoSansKRThin, fontWeight: 100 },
        { src: NotoSansExtraBold, fontWeight: 800 },
        { src: NotoSansExtraLight, fontWeight: 200 },
        { src: NotoSansLight, fontWeight: 300 },
    ],
});

// PDF 스타일 정의

// PDF 문서 컴포넌트
interface TrackPDFProps {
    data: TrackProjectBoardDetailResponse;
}

const TrackPDF = ({ data }: TrackPDFProps) => {
    const leader = data.members.find((member) => member.role === 'LEADER');
    const teamMembers = data.members.filter(
        (member) => member.role !== 'LEADER',
    );

    return (
        <Document>
            <Page size="A4" style={PDFStyles.page}>
                <Text hyphenationCallback={() => ['']} style={PDFStyles.header}>
                    {data.title}
                </Text>
                <View style={PDFStyles.infoSection}>
                    <View style={PDFStyles.infoColumn}>
                        <View style={PDFStyles.infoRow}>
                            <Text style={PDFStyles.label}>팀장:</Text>
                            <Text style={PDFStyles.value}>
                                {leader?.name || '미지정'}
                            </Text>
                        </View>

                        <View style={PDFStyles.infoRow}>
                            <Text style={PDFStyles.label}>팀원:</Text>
                            <View style={PDFStyles.membersList}>
                                {teamMembers.map((member, index) => (
                                    <Text
                                        key={`member-${member.name}-${index}`}
                                        style={PDFStyles.value}
                                    >
                                        {member.name}
                                        {index < teamMembers.length - 1
                                            ? ', '
                                            : ''}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </View>

                    <View style={PDFStyles.infoColumn}>
                        <View style={PDFStyles.infoRow}>
                            <Text style={PDFStyles.label}>제출일:</Text>
                            <Text
                                style={PDFStyles.value}
                                hyphenationCallback={() => ['']}
                            >
                                {convertDate(data.createdAt)}
                            </Text>
                        </View>

                        {data.url && (
                            <View style={PDFStyles.infoRow}>
                                <Text style={PDFStyles.label}>URL:</Text>
                                <Link style={PDFStyles.value} src={data.url}>
                                    {`${data.title} 바로가기`}
                                </Link>
                            </View>
                        )}
                    </View>
                </View>

                <View style={PDFStyles.contentSection}>
                    <View style={PDFStyles.content}>
                        {parseMarkdown(data.content)}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default TrackPDF;
