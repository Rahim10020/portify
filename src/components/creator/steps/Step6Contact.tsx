'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { socialsSchema, SocialsInput } from '@/lib/utils/validation';
import { Socials } from '@/types';
import { Github, Linkedin, Twitter, Mail, Globe, Dribbble } from 'lucide-react';

interface Step6ContactProps {
    data: Socials;
    onUpdate: (data: Socials) => void;
    onNext: () => void;
    onBack: () => void;
}

export const Step6Contact = ({ data, onUpdate, onNext, onBack }: Step6ContactProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SocialsInput>({
        resolver: zodResolver(socialsSchema),
        defaultValues: data,
    });

    const onSubmit = (formData: SocialsInput) => {
        onUpdate(formData as Socials);
        onNext();
    };

    const socialFields = [
        {
            name: 'email' as const,
            label: 'Email',
            placeholder: 'your@email.com',
            icon: Mail,
            required: true,
        },
        {
            name: 'github' as const,
            label: 'GitHub',
            placeholder: 'https://github.com/username',
            icon: Github,
        },
        {
            name: 'linkedin' as const,
            label: 'LinkedIn',
            placeholder: 'https://linkedin.com/in/username',
            icon: Linkedin,
        },
        {
            name: 'twitter' as const,
            label: 'Twitter',
            placeholder: 'https://twitter.com/username',
            icon: Twitter,
        },
        {
            name: 'dribbble' as const,
            label: 'Dribbble',
            placeholder: 'https://dribbble.com/username',
            icon: Dribbble,
        },
        {
            name: 'behance' as const,
            label: 'Behance',
            placeholder: 'https://behance.net/username',
            icon: Dribbble,
        },
        {
            name: 'website' as const,
            label: 'Personal Website',
            placeholder: 'https://yourwebsite.com',
            icon: Globe,
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Contact & Social Links</h2>
                <p className="text-foreground/70">
                    Add ways for people to reach you and view your work
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {socialFields.map((field) => {
                    const Icon = field.icon;
                    return (
                        <div key={field.name} className="relative">
                            <div className="absolute left-3 top-[38px] text-foreground/50">
                                <Icon size={18} />
                            </div>
                            <Input
                                label={`${field.label}${field.required ? ' *' : ' (Optional)'}`}
                                type={field.name === 'email' ? 'email' : 'url'}
                                placeholder={field.placeholder}
                                className="pl-10"
                                error={errors[field.name]?.message}
                                {...register(field.name)}
                            />
                        </div>
                    );
                })}

                <div className="bg-muted/30 rounded-lg p-4 text-sm text-foreground/70">
                    <p className="font-medium text-foreground mb-2">💡 Tips:</p>
                    <ul className="space-y-1 list-disc list-inside">
                        <li>Make sure to include the full URL (including https://)</li>
                        <li>Email is required so people can contact you</li>
                        <li>Add at least 2-3 social links for better reach</li>
                    </ul>
                </div>

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