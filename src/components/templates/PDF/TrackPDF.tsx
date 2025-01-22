import NotoSansKRRegular from '/assets/fonts/NotoSansKR-Regular.ttf';
import NotoSansKRBold from '/assets/fonts/NotoSansKR-Bold.ttf';
import ToastViewerComponent from '@/layouts/ToastViewerComponent';
import { TrackProjectBoardDetailResponse } from '@/types/TrackProject';
import convertDate from '@/utils/convertDate';

import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from '@react-pdf/renderer';

Font.register({
    family: 'NotoSansKR',
    fonts: [
        { src: NotoSansKRRegular, fontWeight: 'normal' },
        { src: NotoSansKRBold, fontWeight: 'bold' },
    ],
});

// PDF 스타일 정의
const styles = StyleSheet.create({
    page: {
        fontFamily: 'NotoSansKR',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
    },
    header: {
        fontFamily: 'NotoSansKR',
        fontSize: 24,
        marginBottom: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    infoSection: {
        fontFamily: 'NotoSansKR',
        marginBottom: 20,
        borderBottom: 1,
        paddingBottom: 10,
    },
    infoRow: {
        fontFamily: 'NotoSansKR',
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        fontFamily: 'NotoSansKR',
        width: 80,
        fontWeight: 'bold',
    },
    value: {
        fontFamily: 'NotoSansKR',
        flex: 1,
    },
    contentSection: {
        marginTop: 20,
        fontFamily: 'NotoSansKR',
    },
    contentTitle: {
        fontFamily: 'NotoSansKR',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        fontFamily: 'NotoSansKR',
        lineHeight: 1.5,
        textAlign: 'justify',
    },
    membersSection: {
        marginTop: 10,
        fontFamily: 'NotoSansKR',
    },
    membersList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        fontFamily: 'NotoSansKR',
    },
});

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
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>{data.title}</Text>

                <View style={styles.infoSection}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>제출일:</Text>
                        <Text style={styles.value}>
                            {convertDate(data.createdAt)}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>팀장:</Text>
                        <Text style={styles.value}>
                            {leader?.name || '미지정'}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>팀원:</Text>
                        <View style={styles.membersList}>
                            <Text style={styles.value}>
                                {teamMembers
                                    .map((member) => member.name)
                                    .join(', ')}
                            </Text>
                        </View>
                    </View>

                    {data.url && (
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>URL:</Text>
                            <Text style={styles.value}>{data.url}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.contentSection}>
                    <Text style={styles.contentTitle}>프로젝트 내용</Text>
                    <Text style={styles.content}>
                        {/* <ToastViewerComponent
                            content={data.content}
                            viewerId="trackViewer"
                        /> */}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default TrackPDF;
