import NotoSansKRRegular from '/assets/fonts/NotoSansKR-Regular.ttf';
import NotoSansKRBold from '/assets/fonts/NotoSansKR-Bold.ttf';
import { TrackProjectBoardDetailResponse } from '@/types/TrackProject';
import convertDate from '@/utils/convertDate';
import { marked } from 'marked';
import { useState, useEffect } from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Image,
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
        fontSize: 12,
        fontWeight: 'bold',
    },
    value: {
        fontFamily: 'NotoSansKR',
        flex: 1,
        fontSize: 12,
    },
    contentSection: {
        marginTop: 12,
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
    const [parsedContent, setParsedContent] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        const parseContent = async () => {
            const content = await parseMarkdownWithMarked(data.content);
            setParsedContent(content);
            console.log(content);
        };

        parseContent();
    }, [data.content]);

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
                    <View style={styles.content}>
                        {parseMarkdownWithMarked(data.content)}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default TrackPDF;

const parseMarkdownWithMarked = (content: string) => {
    const tokens = marked.lexer(content);

    return tokens.map((token, index) => {
        switch (token.type) {
            case 'heading':
                return (
                    <Text
                        key={index}
                        style={{
                            fontSize: 24 - token.depth * 2,
                            fontWeight: 'bold',
                            marginVertical: 10,
                        }}
                    >
                        {token.text}
                    </Text>
                );

            case 'paragraph':
                return (
                    <Text
                        key={index}
                        style={{
                            marginVertical: 5,
                            lineHeight: 1.5,
                        }}
                    >
                        {token.text}
                    </Text>
                );

            case 'list':
                return (
                    <View
                        key={index}
                        style={{ marginLeft: 10, marginVertical: 5 }}
                    >
                        {token.items.map((item: any, itemIndex: number) => (
                            <Text key={itemIndex} style={{ marginVertical: 2 }}>
                                • {item.text}
                            </Text>
                        ))}
                    </View>
                );

            case 'code':
                return (
                    <View
                        key={index}
                        style={{
                            backgroundColor: '#f5f5f5',
                            padding: 10,
                            marginVertical: 5,
                        }}
                    >
                        <Text style={{ fontFamily: 'Courier' }}>
                            {token.text}
                        </Text>
                    </View>
                );

            default:
                return null;
        }
    });
};

const convertWebpToPng = async (url: string): Promise<string> => {
    try {
        // 이미지를 Canvas에 그리기
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 이미지 로드 대기
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = url;
        });

        // Canvas 크기 설정
        canvas.width = img.width;
        canvas.height = img.height;

        // 이미지를 Canvas에 그리기
        ctx?.drawImage(img, 0, 0);

        // PNG로 변환
        return canvas.toDataURL('image/png');
    } catch (error) {
        console.error('Image conversion error:', error);
        throw error;
    }
};
