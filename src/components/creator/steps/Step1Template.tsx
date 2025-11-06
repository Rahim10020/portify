'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TEMPLATES } from '@/lib/constants/templates';
import { Check } from 'lucide-react';

interface Step1TemplateProps {
    selectedTemplateId: string;
    onSelect: (templateId: string) => void;
    onNext: () => void;
}

export const Step1Template = ({ selectedTemplateId, onSelect, onNext }: Step1TemplateProps) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Template</h2>
                <p className="text-foreground/70">
                    Select a template that best fits your style and profession
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {TEMPLATES.map((template) => (
                    <Card
                        key={template.id}
                        className={`cursor-pointer transition-all ${selectedTemplateId === template.id
                            ? 'ring-2 ring-primary border-primary'
                            : 'hover:border-primary/50'
                            }`}
                        onClick={() => onSelect(template.id)}
                    >
                        {/* Preview */}
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-4">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-2xl font-bold text-foreground/20">{template.name}</div>
                            </div>

                            {selectedTemplateId === template.id && (
                                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                    <Check size={16} className="text-white" />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-foreground">{template.name}</h3>
                                <Badge variant={template.tier === 'free' ? 'success' : 'default'}>
                                    {template.tier === 'free' ? 'Free' : 'Pro'}
                                </Badge>
                            </div>
                            <p className="text-sm text-foreground/70">{template.description}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end pt-6">
                <Button onClick={onNext} disabled={!selectedTemplateId} size="lg">
                    Continue
                </Button>
            </div>
        </div>
    );
};