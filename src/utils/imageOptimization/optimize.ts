import {
    ImageOptimizationOptions,
    DEFAULT_OPTIMIZATION_OPTIONS,
    ImageAnalysis,
} from './types';
import { analyzeImage } from './analyze';

// 파일 크기 기반으로 최적의 품질 설정을 결정하는 함수
const getOptimalQuality = (fileSize: number): number => {
    if (fileSize > 1000000) return 0.75; // 1MB 이상
    if (fileSize > 500000) return 0.8; // 500KB 이상
    if (fileSize > 100000) return 0.85; // 100KB 이상
    return 0.9; // 그 외 작은 파일
};

// 이미지가 WebP 포맷인지 확인하는 함수
const shouldConvertToWebP = (file: File | Blob): boolean => {
    const type = file.type.toLowerCase();
    return !type.includes('webp');
};

// 이미지 최적화가 필요한지 확인하는 함수
const needsOptimization = (
    size: number,
    dimensions: { width: number; height: number },
    options: ImageOptimizationOptions,
): boolean => {
    return (
        size > 10 * 1024 || // 10KB 이상
        dimensions.width > options.maxWidth ||
        dimensions.height > options.maxHeight
    );
};

// 이미지 최적화
export async function optimizeImageToWebP(
    file: File | Blob,
    options: ImageOptimizationOptions = DEFAULT_OPTIMIZATION_OPTIONS,
): Promise<{ optimizedBlob: Blob; analysis: ImageAnalysis }> {
    const originalSize = file.size;
    const originalDimensions = await analyzeImage(file);

    // 최적화 필요성 체크
    const requiresOptimization = needsOptimization(
        originalSize,
        originalDimensions,
        options,
    );

    // WebP 변환 필요성 체크
    const requiresWebP = shouldConvertToWebP(file);

    // 최적화나 변환이 필요없는 경우 원본 반환
    if (!requiresOptimization && !requiresWebP) {
        return {
            optimizedBlob: file,
            analysis: {
                originalSize,
                optimizedSize: originalSize,
                originalDimensions,
                optimizedDimensions: originalDimensions,
                compressionRatio: 0,
                format: file.type.split('/')[1] || 'unknown',
            },
        };
    }

    // 파일 크기에 따른 최적의 품질 설정
    const quality = getOptimalQuality(originalSize);
    const finalQuality = Math.min(quality, options.quality); // 사용자 설정값과 비교하여 더 낮은 값 사용

    return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        img.onload = () => {
            let { width, height } = img;
            const aspectRatio = width / height;

            // 치수 최적화
            if (width > options.maxWidth) {
                width = options.maxWidth;
                height = width / aspectRatio;
            }

            if (height > options.maxHeight) {
                height = options.maxHeight;
                width = height * aspectRatio;
            }

            canvas.width = width;
            canvas.height = height;

            ctx?.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                async (blob) => {
                    if (blob) {
                        // 최적화된 이미지가 원본보다 크다면 원본을 사용
                        const finalBlob =
                            blob.size > originalSize ? file : blob;
                        const analysis: ImageAnalysis = {
                            originalSize,
                            optimizedSize: finalBlob.size,
                            originalDimensions,
                            optimizedDimensions: {
                                width,
                                height,
                            },
                            compressionRatio:
                                ((originalSize - finalBlob.size) /
                                    originalSize) *
                                100,
                            format:
                                finalBlob === file
                                    ? file.type.split('/')[1] || 'unknown'
                                    : 'webp',
                        };

                        resolve({
                            optimizedBlob: finalBlob,
                            analysis,
                        });
                    } else {
                        reject(new Error('이미지 최적화에 실패했습니다.'));
                    }
                },
                'image/webp',
                finalQuality,
            );
        };

        img.onerror = () => reject(new Error('이미지 로드에 실패했습니다.'));

        // Blob URL을 사용하여 메모리 최적화
        img.src = URL.createObjectURL(file);
    });
}
