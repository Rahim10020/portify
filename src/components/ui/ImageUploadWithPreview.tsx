'use client';

import { useState, useRef } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ImageUploadWithPreviewProps {
    onUpload: (file: File) => Promise<string>;
    currentImage?: string;
    onRemove?: () => void;
    label?: string;
    maxSizeMB?: number;
    aspectRatio?: 'square' | 'portrait' | 'landscape' | 'free';
    className?: string;
}

export const ImageUploadWithPreview = ({
    onUpload,
    currentImage,
    onRemove,
    label = 'Upload Image',
    maxSizeMB = 5,
    aspectRatio = 'free',
    className,
}: ImageUploadWithPreviewProps) => {
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const aspectRatioClasses = {
        square: 'aspect-square',
        portrait: 'aspect-[3/4]',
        landscape: 'aspect-[4/3]',
        free: '',
    };

    const validateFile = (file: File): string | null => {
        if (!file.type.startsWith('image/')) {
            return 'Please upload an image file';
        }

        const maxSize = maxSizeMB * 1024 * 1024;
        if (file.size > maxSize) {
            return `Image too large. Max ${maxSizeMB}MB`;
        }

        return null;
    };

    const handleFileChange = async (file: File) => {
        setError(null);

        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload
        try {
            setUploading(true);
            await onUpload(file);
        } catch (err) {
            setError('Failed to upload image');
            setPreview(null);
        } finally {
            setUploading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileChange(file);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileChange(file);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onRemove?.();
    };

    return (
        <div className={cn('w-full', className)}>
            {label && (
                <label className="block text-sm font-medium text-foreground mb-2">
                    {label}
                </label>
            )}

            {preview ? (
                <div className="relative">
                    <div className={cn(
                        'relative rounded-lg overflow-hidden border-2 border-border',
                        aspectRatioClasses[aspectRatio]
                    )}>
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        {uploading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <div className="text-white text-sm">Uploading...</div>
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="cursor-pointer absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                        disabled={uploading}
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={cn(
                        'border-2 border-dashed rounded-lg transition-colors cursor-pointer',
                        dragActive
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50',
                        aspectRatioClasses[aspectRatio] || 'py-12'
                    )}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <div className="flex flex-col items-center justify-center h-full px-4">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                            {uploading ? (
                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
                            ) : (
                                <ImageIcon className="text-foreground/50" size={24} />
                            )}
                        </div>
                        <p className="text-sm text-foreground/70 text-center mb-1">
                            {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-xs text-foreground/50">
                            PNG, JPG up to {maxSizeMB}MB
                        </p>
                    </div>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleInputChange}
                disabled={uploading}
            />

            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};