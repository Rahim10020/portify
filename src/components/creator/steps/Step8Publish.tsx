'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { slugSchema, SlugInput } from '@/lib/utils/validation';
import { slugify } from '@/lib/utils/slugify';
import { Check } from 'lucide-react';

interface Step8PublishProps {
    slug: string;
    isPublished: boolean;
    onUpdate: (data: { slug: string; isPublished: boolean }) => void;
    onPublish: () => void;
    onBack: () => void;
    isLoading?: boolean;
}

export const Step8Publish = ({
    slug,
    isPublished,
    onUpdate,
    onPublish,
    onBack,
    isLoading,
}: Step8PublishProps) => {
    const [published, setPublished] = useState(isPublished);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<SlugInput>({
        resolver: zodResolver(slugSchema),
        defaultValues: { slug },
    });

    const handleSlugChange = (value: string) => {
        const slugified = slugify(value);
        setValue('slug', slugified);
    };

    const onSubmit = (data: SlugInput) => {
        onUpdate({ slug: data.slug, isPublished: published });
        onPublish();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Publish Your Portfolio</h2>
                <p className="text-foreground/70">
                    Choose your unique URL and decide if you want to publish now
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Slug Input */}
                <div>
                    <Input
                        label="Your Portfolio URL *"
                        placeholder="johndoe"
                        error={errors.slug?.message}
                        {...register('slug', {
                            onChange: (e) => handleSlugChange(e.target.value),
                        })}
                    />
                    <p className="mt-2 text-sm text-foreground/60">
                        Your portfolio will be available at:{' '}
                        <span className="font-mono text-primary">
                            {process.env.NEXT_PUBLIC_APP_URL}/u/{slug || 'your-slug'}
                        </span>
                    </p>
                </div>

                {/* Publish Toggle */}
                <div className="p-6 rounded-xl border border-border bg-muted/30">
                    <Switch
                        checked={published}
                        onChange={setPublished}
                        label="Publish immediately"
                    />
                    <p className="mt-2 text-sm text-foreground/60">
                        {published
                            ? 'Your portfolio will be live and accessible to everyone'
                            : 'Save as draft and publish later from your dashboard'}
                    </p>
                </div>

                {/* Summary */}
                <div className="p-6 rounded-xl border border-border space-y-3">
                    <h3 className="font-semibold text-foreground">Ready to launch?</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-foreground/70">
                            <Check size={16} className="text-green-500" />
                            <span>Template selected</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/70">
                            <Check size={16} className="text-green-500" />
                            <span>Personal information added</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/70">
                            <Check size={16} className="text-green-500" />
                            <span>Projects added</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/70">
                            <Check size={16} className="text-green-500" />
                            <span>Skills added</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between pt-6">
                    <Button type="button" variant="ghost" onClick={onBack} disabled={isLoading}>
                        Back
                    </Button>
                    <Button type="submit" size="md" isLoading={isLoading}>
                        {published ? 'Publish Portfolio' : 'Save as Draft'}
                    </Button>
                </div>
            </form>
        </div>
    );
};