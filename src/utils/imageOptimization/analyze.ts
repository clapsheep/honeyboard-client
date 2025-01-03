// 최적화 전 원본 이미지 분석
export async function analyzeImage(
    blob: Blob,
): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve({
                width: img.width,
                height: img.height,
            });
        };
        img.onerror = () => reject(new Error('Failed to analyze image'));
        img.src = URL.createObjectURL(blob);
    });
}
