import { TrackProjectBoardDetailResponse } from '@/types/TrackProject';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// PDF 스타일 정의
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
    },
    header: {
        fontSize: 24,
        marginBottom: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    infoSection: {
        marginBottom: 20,
        borderBottom: 1,
        paddingBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        width: 80,
        fontWeight: 'bold',
    },
    value: {
        flex: 1,
    },
    contentSection: {
        marginTop: 20,
    },
    contentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        lineHeight: 1.5,
        textAlign: 'justify',
    },
    membersSection: {
        marginTop: 10,
    },
    membersList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

// PDF 문서 컴포넌트
const TrackPDF = ({
    title,
    url,
    content,
    members,
    createdAt,
}: TrackProjectBoardDetailResponse) => {
    const leader = members.find((member) => member.role === 'LEADER');
    const teamMembers = members.filter((member) => member.role !== 'LEADER');

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>{title}</Text>

                <View style={styles.infoSection}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>제출일:</Text>
                        <Text style={styles.value}>
                            {new Date(createdAt).toLocaleDateString('ko-KR')}
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

                    {url && (
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>URL:</Text>
                            <Text style={styles.value}>{url}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.contentSection}>
                    <Text style={styles.contentTitle}>프로젝트 내용</Text>
                    <Text style={styles.content}>{content}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default TrackPDF;
