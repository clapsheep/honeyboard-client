import { Image, Link, Text, View } from '@react-pdf/renderer';
import PDFStyles from './pdfStyles';

export const parseMarkdown = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentIndex = 0;
    let isInCodeBlock = false;
    let codeBlockContent = '';
    let isInTable = false;
    let tableHeaders: string[] = [];
    let tableRows: string[][] = [];

    while (currentIndex < lines.length) {
        const line = lines[currentIndex];

        // 코드 블록 처리 (```로 시작하는 경우)
        if (line.startsWith('```')) {
            if (!isInCodeBlock) {
                isInCodeBlock = true;
                codeBlockContent = '';
            } else {
                elements.push(
                    <View
                        key={`code-${currentIndex}`}
                        style={PDFStyles.codeBlock}
                    >
                        <Text style={{ fontWeight: 500 }}>
                            {codeBlockContent.trim()}
                        </Text>
                    </View>,
                );
                isInCodeBlock = false;
            }
            currentIndex++;
            continue;
        }

        if (isInCodeBlock) {
            codeBlockContent += line + '\n';
            currentIndex++;
            continue;
        }

        // 테이블 처리
        if (line.startsWith('|')) {
            if (!isInTable) {
                isInTable = true;
                tableHeaders = line
                    .split('|')
                    .slice(1, -1)
                    .map((header) => header.trim());
                currentIndex += 2; // 헤더 행과 구분자 행 건너뛰기
                continue;
            }

            if (line.trim() !== '') {
                const row = line
                    .split('|')
                    .slice(1, -1)
                    .map((cell) => cell.trim());
                tableRows.push(row);
            } else {
                // 테이블 종료
                elements.push(
                    <View key={`table-${currentIndex}`} style={PDFStyles.table}>
                        <View style={PDFStyles.tableRow}>
                            {tableHeaders.map((header, i) => (
                                <Text
                                    key={`header-${i}`}
                                    style={[
                                        PDFStyles.tableHeader,
                                        { fontWeight: 700 },
                                    ]}
                                >
                                    {header}
                                </Text>
                            ))}
                        </View>
                        {tableRows.map((row, i) => (
                            <View key={`row-${i}`} style={PDFStyles.tableRow}>
                                {row.map((cell, j) => (
                                    <Text
                                        key={`cell-${i}-${j}`}
                                        style={[
                                            PDFStyles.tableCell,
                                            { fontWeight: 500 },
                                        ]}
                                    >
                                        {cell}
                                    </Text>
                                ))}
                            </View>
                        ))}
                    </View>,
                );
                isInTable = false;
                tableHeaders = [];
                tableRows = [];
            }
            currentIndex++;
            continue;
        }

        // 인용문 처리
        if (line.startsWith('>')) {
            elements.push(
                <View
                    key={`quote-${currentIndex}`}
                    style={PDFStyles.blockquote}
                >
                    <Text style={{ fontWeight: 500 }}>
                        {line.slice(1).trim()}
                    </Text>
                </View>,
            );
            currentIndex++;
            continue;
        }

        // 리스트 처리
        if (line.startsWith('- ')) {
            elements.push(
                <View key={`list-${currentIndex}`} style={PDFStyles.listItem}>
                    <Text style={[PDFStyles.bullet, { fontWeight: 500 }]}>
                        •
                    </Text>
                    <Text style={{ flex: 1, fontWeight: 500 }}>
                        {line.slice(2)}
                    </Text>
                </View>,
            );
            currentIndex++;
            continue;
        }

        // 제목 처리
        if (line.startsWith('# ')) {
            elements.push(
                <Text key={`h1-${currentIndex}`} style={PDFStyles.h1}>
                    {line.slice(2)}
                </Text>,
            );
        } else if (line.startsWith('## ')) {
            elements.push(
                <Text key={`h2-${currentIndex}`} style={PDFStyles.h2}>
                    {line.slice(3)}
                </Text>,
            );
        } else if (line.startsWith('### ')) {
            elements.push(
                <Text key={`h3-${currentIndex}`} style={PDFStyles.h3}>
                    {line.slice(4)}
                </Text>,
            );
        } else if (line.startsWith('#### ')) {
            elements.push(
                <Text key={`h4-${currentIndex}`} style={PDFStyles.h4}>
                    {line.slice(5)}
                </Text>,
            );
        }
        // 이미지 처리
        else if (line.match(/!\[.*?\]\((.*?)\)/)) {
            const match = line.match(/!\[.*?\]\((.*?)\)/);
            if (match && match[1]) {
                elements.push(
                    <Image
                        key={`img-${currentIndex}`}
                        style={PDFStyles.image}
                        src={match[1]}
                    />,
                );
            }
        }
        // 일반 텍스트 처리 (볼드, 이탤릭, 취소선, 인라인 코드 등)
        else {
            let text = line;

            // 볼드 처리
            text = text.replace(
                /\*\*(.*?)\*\*/g,
                (_, content) => `<bold>${content}</bold>`,
            );

            // 이탤릭 처리
            text = text.replace(
                /\*(.*?)\*/g,
                (_, content) => `<italic>${content}</italic>`,
            );

            // 취소선 처리
            text = text.replace(
                /~~(.*?)~~/g,
                (_, content) => `<strikethrough>${content}</strikethrough>`,
            );

            // 인라인 코드 처리
            text = text.replace(
                /`(.*?)`/g,
                (_, content) => `<code>${content}</code>`,
            );

            // 링크 처리
            text = text.replace(
                /\[(.*?)\]\((.*?)\)/g,
                (_, content, url) => `<link href="${url}">${content}</link>`,
            );

            // 텍스트를 파싱하여 스타일이 적용된 컴포넌트로 변환
            const textElements = text
                .split(/(<[^>]+>.*?<\/[^>]+>)/)
                .map((part) => {
                    if (part.startsWith('<bold>')) {
                        return (
                            <Text
                                key={`bold-${currentIndex}`}
                                style={PDFStyles.bold}
                            >
                                {part.slice(6, -7)}
                            </Text>
                        );
                    }
                    if (part.startsWith('<italic>')) {
                        return (
                            <Text
                                key={`italic-${currentIndex}`}
                                style={PDFStyles.italic}
                            >
                                {part.slice(8, -9)}
                            </Text>
                        );
                    }
                    if (part.startsWith('<strikethrough>')) {
                        return (
                            <Text
                                key={`strikethrough-${currentIndex}`}
                                style={PDFStyles.strikethrough}
                            >
                                {part.slice(14, -15)}
                            </Text>
                        );
                    }
                    if (part.startsWith('<code>')) {
                        return (
                            <Text
                                key={`inlineCode-${currentIndex}`}
                                style={PDFStyles.inlineCode}
                            >
                                {part.slice(6, -7)}
                            </Text>
                        );
                    }
                    if (part.startsWith('<link')) {
                        const href = part.match(/href="(.*?)"/)?.[1] || '';
                        const content =
                            part.match(/">(.*?)<\/link>/)?.[1] || '';
                        return (
                            <Link
                                key={`link-${currentIndex}`}
                                style={PDFStyles.link}
                                src={href}
                            >
                                {content}
                            </Link>
                        );
                    }
                    return part ? (
                        <Text
                            key={`paragraph-${currentIndex}`}
                            style={PDFStyles.paragraph}
                        >
                            {part}
                        </Text>
                    ) : null;
                });

            elements.push(
                <View
                    key={`text-${currentIndex}`}
                    style={{ flexDirection: 'row' }}
                >
                    {textElements}
                </View>,
            );
        }

        currentIndex++;
    }

    // 마지막 테이블 처리
    if (isInTable && tableRows.length > 0) {
        elements.push(
            <View key={`tableEnd-${currentIndex}`} style={PDFStyles.table}>
                <View style={PDFStyles.tableRow}>
                    {tableHeaders.map((header, i) => (
                        <Text
                            key={`header-${i}`}
                            style={[PDFStyles.tableHeader, { fontWeight: 700 }]}
                        >
                            {header}
                        </Text>
                    ))}
                </View>
                {tableRows.map((row, i) => (
                    <View key={`row-${i}`} style={PDFStyles.tableRow}>
                        {row.map((cell, j) => (
                            <Text
                                key={`cell-${i}-${j}`}
                                style={[
                                    PDFStyles.tableCell,
                                    { fontWeight: 500 },
                                ]}
                            >
                                {cell}
                            </Text>
                        ))}
                    </View>
                ))}
            </View>,
        );
    }

    return elements;
};
