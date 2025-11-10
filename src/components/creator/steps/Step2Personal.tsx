'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';
import { personalInfoSchema, PersonalInfoInput } from '@/lib/utils/validation';
import { uploadProfilePhoto } from '@/lib/cloudinary/upload';
import { ImageUploadWithPreview } from '@/components/ui/ImageUploadWithPreview';
import { PROFESSIONAL_TITLES, BIO_SUGGESTIONS, LOCATION_SUGGESTIONS } from '@/lib/constants/suggestions';
import { Upload, X, ExternalLink } from 'lucide-react';

interface Step2PersonalProps {
    data: PersonalInfoInput & { photo?: string };
    onUpdate: (data: PersonalInfoInput & { photo?: string }) => void;
    onNext: () => void;
    onBack: () => void;
}

export const Step2Personal = ({ data, onUpdate, onNext, onBack }: Step2PersonalProps) => {
    const toast = useToast();
    const [photoUrl, setPhotoUrl] = useState<string | undefined>(data.photo);
    const [selectedTitle, setSelectedTitle] = useState<string>(data.title || '');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<PersonalInfoInput>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: data,
    });

    const watchedTitle = watch('title');

    const handlePhotoUpload = async (file: File) => {
        try {
            const url = await uploadProfilePhoto(file);
            setPhotoUrl(url);
            return url;
        } catch (error) {
            toast.error('Failed to upload photo');
            throw error;
        }
    };

    const handleRemovePhoto = () => {
        setPhotoUrl(undefined);
    };

    const handleTitleSelect = (value: string) => {
        setSelectedTitle(value);
        setValue('title', value);
    };

    const handleBioSuggestion = (suggestion: string) => {
        setValue('bio', suggestion);
    };

    const handleLongBioSuggestion = (suggestion: string) => {
        setValue('longBio', suggestion);
    };

    const getBioSuggestions = (title: string) => {
        return BIO_SUGGESTIONS[title as keyof typeof BIO_SUGGESTIONS] || BIO_SUGGESTIONS.default;
    };

    const generateChatGPTUrl = (type: 'short' | 'long', title: string) => {
        const prompt = type === 'short'
            ? `Write a professional short bio (max 200 characters) for a ${title}. Make it engaging and highlight key skills.`
            : `Write a detailed professional bio for a ${title}. Include background, experience, skills, and career goals. Make it compelling and authentic.`;
        return `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`;
    };

    const onSubmit = (formData: PersonalInfoInput) => {
        onUpdate({ ...formData, photo: photoUrl });
        onNext();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Personal Information</h2>
                <p className="text-foreground/70">Tell us about yourself</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Photo Upload */}
                <ImageUploadWithPreview
                    onUpload={handlePhotoUpload}
                    currentImage={photoUrl}
                    onRemove={handleRemovePhoto}
                    label="Profile Photo (Optional)"
                    maxSizeMB={5}
                    aspectRatio="square"
                />

                <Input
                    label="Full Name *"
                    placeholder="John Doe"
                    error={errors.name?.message}
                    {...register('name')}
                />

                <div className="space-y-2">
                    <Select
                        label="Professional Title *"
                        options={[
                            { value: '', label: 'Select a title or type your own...' },
                            ...PROFESSIONAL_TITLES.map(title => ({ value: title, label: title }))
                        ]}
                        value={selectedTitle}
                        onChange={(e) => handleTitleSelect(e.target.value)}
                        error={errors.title?.message}
                    />
                    <Input
                        placeholder="Or type your custom title..."
                        {...register('title')}
                        className="mt-2"
                    />
                </div>

                <div className="space-y-2">
                    <Textarea
                        label="Short Bio * (Max 200 characters)"
                        placeholder="A brief description about yourself..."
                        rows={3}
                        error={errors.bio?.message}
                        {...register('bio')}
                    />
                    {watchedTitle && (
                        <div className="space-y-2">
                            <p className="text-sm text-foreground/70">Suggestions based on your title:</p>
                            <div className="flex flex-wrap gap-2">
                                {getBioSuggestions(watchedTitle).map((suggestion, index) => (
                                    <Button
                                        key={index}
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => handleBioSuggestion(suggestion)}
                                        className="text-xs"
                                    >
                                        Use this suggestion
                                    </Button>
                                ))}
                            </div>
                            <a
                                href={generateChatGPTUrl('short', watchedTitle)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                                <ExternalLink size={14} />
                                Get ChatGPT to write your bio
                            </a>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Textarea
                        label="Long Bio (Optional - For About Page)"
                        placeholder="A more detailed description about your background, experience, and passion..."
                        rows={5}
                        {...register('longBio')}
                    />
                    {watchedTitle && (
                        <div className="space-y-2">
                            <p className="text-sm text-foreground/70">Suggestions based on your title:</p>
                            <div className="flex flex-wrap gap-2">
                                {getBioSuggestions(watchedTitle).map((suggestion, index) => (
                                    <Button
                                        key={index}
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => handleLongBioSuggestion(suggestion)}
                                        className="text-xs"
                                    >
                                        Use this suggestion
                                    </Button>
                                ))}
                            </div>
                            <a
                                href={generateChatGPTUrl('long', watchedTitle)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                                <ExternalLink size={14} />
                                Get ChatGPT to write your detailed bio
                            </a>
                        </div>
                    )}
                </div>

                <Select
                    label="Location (Optional)"
                    options={[
                        { value: '', label: 'Select a location or type your own...' },
                        ...LOCATION_SUGGESTIONS.map(location => ({ value: location, label: location }))
                    ]}
                    error={errors.location?.message}
                    {...register('location')}
                />

                <div className="flex justify-between pt-6">
                    <Button type="button" variant="ghost" onClick={onBack}>
                        Back
                    </Button>
                    <Button type="submit" size="md">
                        Continue
                    </Button>
                </div>
            </form>
        </div>
    );
};