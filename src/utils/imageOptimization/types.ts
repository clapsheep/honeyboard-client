export interface ImageOptimizationOptions {
    maxWidth: number;
    maxHeight: number;
    quality: number;
}

export const DEFAULT_OPTIMIZATION_OPTIONS: ImageOptimizationOptions = {
    maxWidth: 1200,
    maxHeight: 800,
    quality: 0.85,
};

export interface ImageAnalysis {
    originalSize: number; // bytes
    optimizedSize: number; // bytes
    originalDimensions: {
        width: number;
        height: number;
    };
    optimizedDimensions: {
        width: number;
        height: number;
    };
    compressionRatio: number; // percentage
    format: string;
}
