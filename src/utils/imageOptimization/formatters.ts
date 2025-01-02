import { ImageAnalysis } from './types';

// 최적화 후 읽기 쉬운 형태로 변환
export function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatAnalysis(analysis: ImageAnalysis): string {
    return `
이미지 최적화 결과:
- 원본 크기: ${formatBytes(analysis.originalSize)}
- 최적화 후 크기: ${formatBytes(analysis.optimizedSize)}
- 원본 dimensions: ${analysis.originalDimensions.width}x${analysis.originalDimensions.height}
- 최적화 후 dimensions: ${analysis.optimizedDimensions.width}x${analysis.optimizedDimensions.height}
- 압축률: ${analysis.compressionRatio.toFixed(2)}%
- 변환 포맷: ${analysis.format}
    `.trim();
}
