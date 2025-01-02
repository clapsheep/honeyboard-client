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
        img.onerror = () => reject(new Error('이미지 분석에 실패했습니다.'));
        img.src = URL.createObjectURL(blob);
    });
}
