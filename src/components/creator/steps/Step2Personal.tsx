'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import { personalInfoSchema, PersonalInfoInput } from '@/lib/utils/validation';
import { uploadProfilePhoto } from '@/lib/cloudinary/upload';
import { ImageUploadWithPreview } from '@/components/ui/ImageUploadWithPreview';
import { Upload, X } from 'lucide-react';

interface Step2PersonalProps {
    data: PersonalInfoInput & { photo?: string };
    onUpdate: (data: PersonalInfoInput & { photo?: string }) => void;
    onNext: () => void;
    onBack: () => void;
}

export const Step2Personal = ({ data, onUpdate, onNext, onBack }: Step2PersonalProps) => {
    const toast = useToast();
    const [photoUrl, setPhotoUrl] = useState<string | undefined>(data.photo);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PersonalInfoInput>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: data,
    });

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

                <Input
                    label="Professional Title *"
                    placeholder="Full Stack Developer"
                    error={errors.title?.message}
                    {...register('title')}
                />

                <Textarea
                    label="Short Bio * (Max 200 characters)"
                    placeholder="A brief description about yourself..."
                    rows={3}
                    error={errors.bio?.message}
                    {...register('bio')}
                />

                <Textarea
                    label="Long Bio (Optional - For About Page)"
                    placeholder="A more detailed description about your background, experience, and passion..."
                    rows={5}
                    {...register('longBio')}
                />

                <Input
                    label="Location (Optional)"
                    placeholder="San Francisco, CA"
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