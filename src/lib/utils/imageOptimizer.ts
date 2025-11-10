/**
 * Utility functions for image optimization and processing
 */

export interface ImageOptimizationOptions {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

/**
 * Generate optimized image URL for Cloudinary
 */
export const optimizeImageUrl = (
    url: string,
    options: ImageOptimizationOptions = {}
): string => {
    if (!url.includes('cloudinary.com')) {
        return url;
    }

    const { width, height, quality = 80, format = 'auto', fit = 'cover' } = options;

    const parts = url.split('/upload/');
    if (parts.length !== 2) return url;

    const transformations = [
        `f_${format}`,
        `q_${quality}`,
        `c_${fit}`,
    ];

    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);

    return `${parts[0]}/upload/${transformations.join(',')}/${parts[1]}`;
};

/**
 * Generate responsive image sizes for srcset
 */
export const generateResponsiveSizes = (
    baseUrl: string,
    sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): { src: string; width: number }[] => {
    return sizes.map(width => ({
        src: optimizeImageUrl(baseUrl, { width, quality: 85 }),
        width,
    }));
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
    });
};

/**
 * Check if image is loaded
 */
export const isImageLoaded = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
    });
};

/**
 * Get image dimensions
 */
export const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.onerror = reject;
        img.src = src;
    });
};

/**
 * Generate blur placeholder data URL
 */
export const generateBlurPlaceholder = async (
    src: string,
    width: number = 10,
    height: number = 10
): Promise<string> => {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        const img = new Image();
        img.crossOrigin = 'anonymous';

        return new Promise((resolve) => {
            img.onload = () => {
                ctx?.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.1));
            };
            img.onerror = () => resolve('');
            img.src = src;
        });
    } catch {
        return '';
    }
};