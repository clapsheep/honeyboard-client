import { StyleSheet } from '@react-pdf/renderer';

const PDFStyles = StyleSheet.create({
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
        fontWeight: 700,
    },
    infoSection: {
        fontFamily: 'NotoSansKR',
        marginBottom: 20,
        borderBottom: 1,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoColumn: {
        flex: 1,
        paddingHorizontal: 10,
    },
    infoRow: {
        fontFamily: 'NotoSansKR',
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        fontFamily: 'NotoSansKR',
        fontSize: 12,
        fontWeight: 700,
        marginRight: 4,
    },
    value: {
        fontFamily: 'NotoSansKR',
        flex: 1,
        fontSize: 12,
    },
    contentSection: {
        fontFamily: 'NotoSansKR',
    },
    contentTitle: {
        fontFamily: 'NotoSansKR',
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 10,
    },
    content: {
        fontFamily: 'NotoSansKR',
        lineHeight: 1.2,
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
    h1: {
        fontSize: 24,
        fontWeight: 700,
        marginVertical: 12,
    },
    h2: {
        fontSize: 20,
        fontWeight: 700,
        marginVertical: 10,
    },
    h3: {
        fontSize: 16,
        fontWeight: 700,
        marginVertical: 8,
    },
    h4: {
        fontSize: 14,
        fontWeight: 700,
        marginVertical: 6,
    },
    paragraph: {
        fontSize: 12,
        // marginVertical: 4,
    },
    bold: {
        fontWeight: 700,
        fontSize: 12,
    },
    italic: {
        fontWeight: 400,
        fontSize: 12,
        transform: 'skew(-10deg)',
    },
    strikethrough: {
        textDecoration: 'line-through',
        fontSize: 12,
    },
    image: {
        marginVertical: 8,
    },
    link: {
        color: 'blue',
        fontSize: 12,
        textDecoration: 'underline',
    },
    codeBlock: {
        fontFamily: 'NotoSansKR',
        backgroundColor: '#f5f5f5',
        padding: 8,
        marginVertical: 8,
        fontSize: 12,
    },
    inlineCode: {
        fontFamily: 'NotoSansKR',
        backgroundColor: '#FEE4E2',
        fontSize: 12,
        borderRadius: 4,
        paddingHorizontal: 2,
        color: '#F04438',
    },
    table: {
        width: '100%',
        fontSize: 8,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#000000',
    },
    tableRow: {
        flexDirection: 'row',
        fontSize: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
    },
    tableHeader: {
        backgroundColor: '#f5f5f5',
        fontSize: 10,
        padding: 5,
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: '#000000',
    },
    tableCell: {
        padding: 5,
        fontSize: 8,
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: '#000000',
        textAlign: 'left',
        wordBreak: 'break-word',
        flexDirection: 'row',
    },
    blockquote: {
        borderLeftWidth: 2,
        borderLeftColor: '#666666',
        paddingLeft: 10,
        fontSize: 14,
        marginLeft: 10,
        marginVertical: 8,
        fontStyle: 'italic',
    },
    listItem: {
        flexDirection: 'row',
        marginVertical: 2,
        paddingLeft: 10,
    },
    bullet: {
        width: 15,
        fontSize: 12,
    },
});
export default PDFStyles;
