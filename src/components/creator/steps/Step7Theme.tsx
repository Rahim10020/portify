'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Card } from '@/components/ui/Card';
import { Theme } from '@/types';
import { useFeatures } from '@/lib/hooks/useFeatures';

interface Step7ThemeProps {
    data: Theme;
    onUpdate: (data: Theme) => void;
    onNext: () => void;
    onBack: () => void;
}

export const Step7Theme = ({ data, onUpdate, onNext, onBack }: Step7ThemeProps) => {
    const features = useFeatures();
    const [theme, setTheme] = useState<Theme>(data);

    const colors = [
        { name: 'Blue', value: '#3B82F6', lightAccent: '#3B82F6', darkAccent: '#60A5FA' },
        { name: 'Purple', value: '#8B5CF6', lightAccent: '#8B5CF6', darkAccent: '#A78BFA' },
        { name: 'Green', value: '#10B981', lightAccent: '#10B981', darkAccent: '#34D399' },
        { name: 'Red', value: '#EF4444', lightAccent: '#EF4444', darkAccent: '#F87171' },
        { name: 'Orange', value: '#F59E0B', lightAccent: '#F59E0B', darkAccent: '#FBBF24' },
        { name: 'Pink', value: '#EC4899', lightAccent: '#EC4899', darkAccent: '#F472B6' },
    ];

    const fonts = [
        { name: 'Inter', value: 'inter' },
        { name: 'Roboto', value: 'roboto' },
        { name: 'Poppins', value: 'poppins' },
        { name: 'Montserrat', value: 'montserrat' },
    ];

    const handleColorChange = (color: typeof colors[0]) => {
        setTheme({
            ...theme,
            primaryColor: color.value,
            lightMode: { ...theme.lightMode, accent: color.lightAccent },
            darkMode: { ...theme.darkMode, accent: color.darkAccent },
        });
    };

    const handleContinue = () => {
        onUpdate(theme);
        onNext();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Theme Customization</h2>
                <p className="text-foreground/70">
                    Customize the look and feel of your portfolio
                </p>
            </div>

            {/* Dark Mode Toggle */}
            <Card>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-foreground mb-1">Dark Mode</h3>
                        <p className="text-sm text-foreground/70">
                            {features.darkMode
                                ? 'Allow visitors to switch between light and dark themes'
                                : 'Upgrade to Pro to enable dark mode'}
                        </p>
                    </div>
                    <Switch
                        checked={theme.darkModeEnabled && features.darkMode}
                        onChange={(checked) =>
                            setTheme({ ...theme, darkModeEnabled: checked })
                        }
                        disabled={!features.darkMode}
                    />
                </div>

                {!features.darkMode && (
                    <div className="mt-4 p-3 rounded-lg bg-primary/10 text-sm text-primary">
                        🔒 Dark mode is a Pro feature
                    </div>
                )}
            </Card>

            {/* Primary Color */}
            <Card>
                <h3 className="font-semibold text-foreground mb-4">Primary Color</h3>
                <div className="grid grid-cols-3 gap-3">
                    {colors.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => handleColorChange(color)}
                            className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${theme.primaryColor === color.value
                                ? 'border-foreground scale-105'
                                : 'border-border hover:border-foreground/50'
                                }`}
                        >
                            <div
                                className="w-full h-12 rounded-lg mb-2"
                                style={{ backgroundColor: color.value }}
                            />
                            <div className="text-sm font-medium text-foreground text-center">
                                {color.name}
                            </div>
                        </button>
                    ))}
                </div>
            </Card>

            {/* Font Selection */}
            <Card>
                <h3 className="font-semibold text-foreground mb-4">Typography</h3>
                <div className="grid grid-cols-2 gap-3">
                    {fonts.map((font) => (
                        <button
                            key={font.value}
                            onClick={() => setTheme({ ...theme, font: font.value })}
                            className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${theme.font === font.value
                                ? 'border-foreground'
                                : 'border-border hover:border-foreground/50'
                                }`}
                            style={{ fontFamily: font.name }}
                        >
                            <div className="text-2xl font-bold mb-1">Aa</div>
                            <div className="text-sm text-foreground/70">{font.name}</div>
                        </button>
                    ))}
                </div>
            </Card>

            {/* Preview */}
            <Card className="bg-muted/30">
                <h3 className="font-semibold text-foreground mb-4">Preview</h3>
                <div
                    className="p-6 rounded-lg border-2"
                    style={{
                        backgroundColor: theme.lightMode.bg,
                        color: theme.lightMode.text,
                        borderColor: theme.primaryColor,
                        fontFamily: fonts.find((f) => f.value === theme.font)?.name,
                    }}
                >
                    <h4 className="text-2xl font-bold mb-2">Your Name</h4>
                    <p className="mb-4">Your Professional Title</p>
                    <button
                        className="cursor-pointer px-4 py-2 rounded-lg text-white font-medium"
                        style={{ backgroundColor: theme.primaryColor }}
                    >
                        Primary Button
                    </button>
                </div>

                {theme.darkModeEnabled && (
                    <div
                        className="p-6 rounded-lg border-2 mt-4"
                        style={{
                            backgroundColor: theme.darkMode.bg,
                            color: theme.darkMode.text,
                            borderColor: theme.darkMode.accent,
                            fontFamily: fonts.find((f) => f.value === theme.font)?.name,
                        }}
                    >
                        <h4 className="text-2xl font-bold mb-2">Your Name</h4>
                        <p className="mb-4">Your Professional Title</p>
                        <button
                            className="cursor-pointer px-4 py-2 rounded-lg text-white font-medium"
                            style={{ backgroundColor: theme.darkMode.accent }}
                        >
                            Primary Button (Dark)
                        </button>
                    </div>
                )}
            </Card>

            {/* Navigation */}
            <div className="flex justify-between pt-6">
                <Button type="button" variant="ghost" onClick={onBack}>
                    Back
                </Button>
                <Button type="button" onClick={handleContinue} size="lg">
                    Continue
                </Button>
            </div>
        </div>
    );
};