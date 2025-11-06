import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={cn(
                        'w-full px-4 py-2 bg-background border border-border rounded-lg',
                        'text-foreground placeholder:text-foreground/50',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                        'transition-all duration-200 resize-none',
                        error && 'border-red-500 focus:ring-red-500',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';