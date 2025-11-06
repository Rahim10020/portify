import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
    ({ checked, onChange, label, disabled }, ref) => {
        return (
            <div className="flex items-center gap-3">
                <button
                    ref={ref}
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    disabled={disabled}
                    onClick={() => onChange(!checked)}
                    className={cn(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                        checked ? 'bg-primary' : 'bg-muted',
                        disabled && 'opacity-50 cursor-not-allowed'
                    )}
                >
                    <span
                        className={cn(
                            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                            checked ? 'translate-x-6' : 'translate-x-1'
                        )}
                    />
                </button>
                {label && (
                    <label className="text-sm font-medium text-foreground">{label}</label>
                )}
            </div>
        );
    }
);

Switch.displayName = 'Switch';