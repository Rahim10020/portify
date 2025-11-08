'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    priority?: boolean;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    onLoad?: () => void;
}

export const OptimizedImage = ({
    src,
    alt,
    className,
    width,
    height,
    priority = false,
    objectFit = 'cover',
    onLoad,
}: OptimizedImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const [error, setError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (priority) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: '50px',
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [priority]);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    const handleError = () => {
        setError(true);
    };

    // Cloudinary optimization
    const optimizeSrc = (originalSrc: string) => {
        // Si c'est une image Cloudinary, ajouter les paramètres d'optimisation
        if (originalSrc.includes('cloudinary.com')) {
            const parts = originalSrc.split('/upload/');
            if (parts.length === 2) {
                // Paramètres d'optimisation Cloudinary
                const transformations = [
                    'f_auto', // Format automatique (WebP si supporté)
                    'q_auto:good', // Qualité automatique
                    width ? `w_${width}` : 'w_auto',
                    height ? `h_${height}` : '',
                    'c_limit', // Ne pas agrandir l'image
                ].filter(Boolean).join(',');

                return `${parts[0]}/upload/${transformations}/${parts[1]}`;
            }
        }

        return originalSrc;
    };

    if (error) {
        return (
            <div
                className={cn(
                    'flex items-center justify-center bg-muted text-foreground/50',
                    className
                )}
                style={{ width, height }}
            >
                <div className="text-center">
                    <svg
                        className="w-12 h-12 mx-auto mb-2 opacity-50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <p className="text-xs">Failed to load image</p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={imgRef}
            className={cn('relative overflow-hidden', className)}
            style={{ width, height }}
        >
            {/* Placeholder blur */}
            {!isLoaded && (
                <div
                    className="absolute inset-0 bg-muted animate-pulse"
                    style={{ width, height }}
                />
            )}

            {/* Image */}
            {isInView && (
                <img
                    src={optimizeSrc(src)}
                    alt={alt}
                    onLoad={handleLoad}
                    onError={handleError}
                    loading={priority ? 'eager' : 'lazy'}
                    className={cn(
                        'transition-opacity duration-300',
                        isLoaded ? 'opacity-100' : 'opacity-0'
                    )}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit,
                    }}
                />
            )}
        </div>
    );
};