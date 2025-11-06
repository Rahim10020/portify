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
    const [uploading, setUploading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PersonalInfoInput>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: data,
    });

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Vérifier la taille (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image too large. Max 5MB');
            return;
        }

        // Vérifier le type
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file');
            return;
        }

        try {
            setUploading(true);
            const url = await uploadProfilePhoto(file);
            setPhotoUrl(url);
            toast.success('Photo uploaded successfully');
        } catch (error) {
            toast.error('Failed to upload photo');
        } finally {
            setUploading(false);
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
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Profile Photo (Optional)
                    </label>

                    {photoUrl ? (
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-border">
                            <img
                                src={photoUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={handleRemovePhoto}
                                className="cursor-pointer absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="flex flex-col items-center justify-center">
                                <Upload className="w-8 h-8 text-foreground/50 mb-2" />
                                <p className="text-sm text-foreground/70">
                                    {uploading ? 'Uploading...' : 'Click to upload photo'}
                                </p>
                                <p className="text-xs text-foreground/50">PNG, JPG up to 5MB</p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                disabled={uploading}
                            />
                        </label>
                    )}
                </div>

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
                    <Button type="submit" size="lg">
                        Continue
                    </Button>
                </div>
            </form>
        </div>
    );
};